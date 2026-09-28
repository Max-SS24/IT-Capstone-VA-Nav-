import uuid

from fastapi import APIRouter, HTTPException

from ..db import pool
from ..models import PreferencesIn
from ..security import ApiKeyDep

router = APIRouter(prefix="/api/veterans", tags=["veterans"], dependencies=[ApiKeyDep])


@router.post("/session", status_code=201)
def create_session():
    """Start (or resume) a chatbot session."""
    session_id = str(uuid.uuid4())
    with pool.connection() as conn:
        row = conn.execute(
            "INSERT INTO veterans (session_id) VALUES (%s) RETURNING id, session_id",
            (session_id,),
        ).fetchone()
    return {"id": str(row[0]), "session_id": row[1]}


@router.put("/{session_id}/preferences")
def save_preferences(session_id: str, prefs: PreferencesIn):
    """Save or update a veteran's care preferences (upsert; partial updates OK)."""
    data = prefs.model_dump(exclude_unset=True)
    with pool.connection() as conn:
        vet = conn.execute(
            "SELECT id FROM veterans WHERE session_id = %s", (session_id,)
        ).fetchone()
        if vet is None:
            raise HTTPException(status_code=404, detail="Session not found")
        veteran_id = vet[0]

        cols = list(PreferencesIn.model_fields.keys())
        values = [data.get(c) for c in cols]
        updates = ", ".join(
            f"{c} = COALESCE(EXCLUDED.{c}, care_preferences.{c})" for c in cols
        )
        row = conn.execute(
            f"""
            INSERT INTO care_preferences (veteran_id, {", ".join(cols)})
            VALUES (%s, {", ".join(["%s"] * len(cols))})
            ON CONFLICT (veteran_id) DO UPDATE SET {updates}, updated_at = now()
            RETURNING *
            """,
            (veteran_id, *values),
        ).fetchone()
        columns = [d.name for d in conn.execute("SELECT * FROM care_preferences LIMIT 0").description]
    return dict(zip(columns, row, strict=False))


@router.get("/{session_id}/preferences")
def get_preferences(session_id: str):
    """Fetch preferences for a session (to resume a conversation)."""
    with pool.connection() as conn:
        cur = conn.execute(
            """
            SELECT cp.* FROM care_preferences cp
            JOIN veterans v ON v.id = cp.veteran_id
            WHERE v.session_id = %s
            """,
            (session_id,),
        )
        row = cur.fetchone()
        if row is None:
            raise HTTPException(status_code=404, detail="No preferences saved yet")
        columns = [d.name for d in cur.description]
    return dict(zip(columns, row, strict=False))
