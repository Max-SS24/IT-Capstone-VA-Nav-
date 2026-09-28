# VetCare Navigator — Backend (Python)

Standalone backend for an AI chatbot that helps veterans find mental health care.
Python + FastAPI + PostgreSQL, validated with Pydantic.

## What it stores

Per veteran chatbot session (anonymous — no accounts needed):

- **Location** — ZIP, city, state, optional coordinates
- **Insurance** — VA Health Care, TRICARE, Medicare, Medicaid, private, uninsured, etc.
- **Previous diagnoses** — list of prior diagnoses, plus whether they've been in care before
- **Care sought** — talk therapy, support group, CBT, DBT, EMDR, medication management, etc.
- **Setting** — in-person, virtual, or either
- **Source** — through the VA, in the community, or either
- **Travel radius** — how far they're willing to travel (miles)

It also includes a **provider directory** with matching, and a **chat message log** so
conversations can be resumed.

## Setup

```bash
python -m venv .venv && source .venv/bin/activate
python -m pip install -r requirements.txt
cp .env.example .env        # fill in DATABASE_URL
uvicorn app.main:app --reload --port 8000
```

Requires PostgreSQL 14+ (`gen_random_uuid()` is built in). Tables are created
automatically on startup from `app/schema.sql`.

Interactive API docs are available at `http://localhost:8000/docs` once running.

## API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/health` | Health check |
| POST | `/api/veterans/session` | Start a chatbot session → returns `session_id` |
| PUT | `/api/veterans/{session_id}/preferences` | Save/update care preferences (upsert; partial updates OK) |
| GET | `/api/veterans/{session_id}/preferences` | Retrieve saved preferences |
| POST | `/api/chat/{session_id}/messages` | Append a chat message (`{ role, content }`) |
| GET | `/api/chat/{session_id}/messages` | Full conversation history |
| POST | `/api/chat/{session_id}/reply` | Send the veteran's message (`{ message }`), get a Grok-generated reply back |
| POST | `/api/providers` | Add a provider to the directory |
| GET | `/api/providers` | List providers |
| GET | `/api/providers/match/{session_id}` | Match providers to a session's saved preferences |

### Example: save preferences

```bash
curl -X PUT http://localhost:8000/api/veterans/<session_id>/preferences \
  -H "Content-Type: application/json" \
  -d '{
    "zip_code": "10001",
    "insurance_type": "va_health_care",
    "previous_diagnoses": ["ptsd", "depression"],
    "care_types": ["talk_therapy", "cbt"],
    "care_setting": "either",
    "care_source": "va",
    "max_travel_miles": 25
  }'
```

### Matching logic

`GET /api/providers/match/{session_id}` filters the directory by:

1. Care types (provider offers at least one requested type)
2. Setting (in-person / virtual / either)
3. Source (VA facility vs. community provider)
4. Insurance accepted
5. Distance — Haversine miles from the veteran's coordinates, capped at `max_travel_miles`

## Grok (xAI) chat replies

The chatbot's replies are generated with Grok. Configure it in `.env`:

```bash
GROK_API_KEY=xai-...     # get a key at https://console.x.ai
GROK_MODEL=grok-4        # optional, this is the default
```

Then the frontend only needs one call per turn:

```bash
curl -X POST http://localhost:8000/api/chat/<session_id>/reply \
  -H "Content-Type: application/json" \
  -d '{"message": "I think I want to try talk therapy."}'
```

The endpoint stores the veteran's message, sends the last 40 messages of
history (plus a veteran-mental-health system prompt with Veterans Crisis Line
guidance) to Grok, then stores and returns the assistant's reply. If
`GROK_API_KEY` is not set, the endpoint returns a clear 503 instead of failing
silently. The plain `/messages` endpoints still work if you'd rather call the
LLM from somewhere else.

## Security notes

- Set `API_KEY` in `.env` and send it as the `x-api-key` header from your chatbot server.
- Sessions are anonymous by design; no PII beyond what the veteran volunteers is stored.
- For production, put this behind HTTPS and review CORS origins in `.env`.
- **Crisis safety:** this backend stores navigation data only. Make sure the chatbot
  itself surfaces the Veterans Crisis Line (988, then press 1) whenever appropriate.
