from fastapi import APIRouter, HTTPException

from ..db import pool
from ..llm import SYSTEM_PROMPT, grok_chat, grok_configured
from ..models import ChatMessageIn, ChatReplyIn
from ..security import ApiKeyDep

router = APIRouter(prefix="/api/chat", tags=["chat"], dependencies=[ApiKeyDep])


@router.post("/{session_id}/messages", status_code=201)
def add_message(session_id: str, msg: ChatMessageIn):
    """Append a chat message to a session."""
    with pool.connection() as conn:
        vet = conn.execute(
            "SELECT id FROM veterans WHERE session_id = %s", (session_id,)
        ).fetchone()
        if vet is None:
            raise HTTPException(status_code=404, detail="Session not found")
        row = conn.execute(
            """
            INSERT INTO chat_messages (veteran_id, role, content)
            VALUES (%s, %s, %s)
            RETURNING id, role, content, created_at
            """,
            (vet[0], msg.role, msg.content.strip()),
        ).fetchone()
    return {"id": str(row[0]), "role": row[1], "content": row[2], "created_at": row[3]}


@router.get("/{session_id}/messages")
def get_messages(session_id: str):
    """Full conversation history for a session."""
    with pool.connection() as conn:
        rows = conn.execute(
            """
            SELECT cm.id, cm.role, cm.content, cm.created_at
            FROM chat_messages cm
            JOIN veterans v ON v.id = cm.veteran_id
            WHERE v.session_id = %s
            ORDER BY cm.created_at ASC
            """,
            (session_id,),
        ).fetchall()
    return [
        {"id": str(r[0]), "role": r[1], "content": r[2], "created_at": r[3]}
        for r in rows
    ]


@router.post("/{session_id}/reply")
def reply(session_id: str, body: ChatReplyIn):
    """Store the veteran's message, generate a reply with Grok, store and return it."""
    if not grok_configured():
        raise HTTPException(
            status_code=503,
            detail="Chat replies are not configured: set GROK_API_KEY in .env",
        )

    text = body.message.strip()
    with pool.connection() as conn:
        vet = conn.execute(
            "SELECT id FROM veterans WHERE session_id = %s", (session_id,)
        ).fetchone()
        if vet is None:
            raise HTTPException(status_code=404, detail="Session not found")

        # 1. Save the veteran's message first.
        conn.execute(
            "INSERT INTO chat_messages (veteran_id, role, content) VALUES (%s, %s, %s)",
            (vet[0], "user", text),
        )

        # 2. Build the conversation history for the model.
        rows = conn.execute(
            """
            SELECT role, content FROM chat_messages
            WHERE veteran_id = %s ORDER BY created_at ASC
            """,
            (vet[0],),
        ).fetchall()

    history = [
        {"role": "system", "content": SYSTEM_PROMPT},
        *[{"role": r[0], "content": r[1]} for r in rows[-40:]],
    ]

    # 3. Ask Grok (outside the DB connection — it's a slow network call).
    answer = grok_chat(history)

    # 4. Save and return the assistant's reply.
    with pool.connection() as conn:
        row = conn.execute(
            """
            INSERT INTO chat_messages (veteran_id, role, content)
            VALUES (%s, %s, %s)
            RETURNING id, role, content, created_at
            """,
            (vet[0], "assistant", answer),
        ).fetchone()
    return {"id": str(row[0]), "role": row[1], "content": row[2], "created_at": row[3]}
