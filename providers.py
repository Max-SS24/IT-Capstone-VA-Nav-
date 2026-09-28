from fastapi import APIRouter, HTTPException

from ..db import pool
from ..models import ProviderIn
from ..security import ApiKeyDep

router = APIRouter(prefix="/api/providers", tags=["providers"], dependencies=[ApiKeyDep])


@router.post("", status_code=201)
def add_provider(provider: ProviderIn):
    """Add a provider to the directory."""
    p = provider.model_dump()
    if p.get("website") is not None:
        p["website"] = str(p["website"])
    cols = list(p.keys())
    with pool.connection() as conn:
        cur = conn.execute(
            f"""
            INSERT INTO providers ({", ".join(cols)})
            VALUES ({", ".join(["%s"] * len(cols))})
            RETURNING *
            """,
            tuple(p[c] for c in cols),
        )
        row = cur.fetchone()
        columns = [d.name for d in cur.description]
    return dict(zip(columns, row, strict=False))


@router.get("")
def list_providers():
    """List all providers (simple directory browse)."""
    with pool.connection() as conn:
        cur = conn.execute("SELECT * FROM providers ORDER BY name LIMIT 200")
        rows = cur.fetchall()
        columns = [d.name for d in cur.description]
    return [dict(zip(columns, r, strict=False)) for r in rows]


@router.get("/match/{session_id}")
def match_providers(session_id: str):
    """Match providers against a veteran's saved preferences.

    Filters by care types, setting (in-person/virtual), source (VA/community),
    insurance, and distance when coordinates are available.
    """
    with pool.connection() as conn:
        cur = conn.execute(
            """
            SELECT cp.* FROM care_preferences cp
            JOIN veterans v ON v.id = cp.veteran_id
            WHERE v.session_id = %s
            """,
            (session_id,),
        )
        pref_row = cur.fetchone()
        if pref_row is None:
            raise HTTPException(status_code=404, detail="No preferences saved for this session")
        pref = dict(zip([d.name for d in cur.description], pref_row, strict=False))

        cur = conn.execute(
            """
            SELECT *,
              CASE WHEN %s::numeric IS NOT NULL AND latitude IS NOT NULL THEN
                -- Haversine distance in miles
                3959 * acos(LEAST(1,
                  cos(radians(%s)) * cos(radians(latitude)) *
                  cos(radians(longitude) - radians(%s)) +
                  sin(radians(%s)) * sin(radians(latitude))
                ))
              END AS distance_miles
            FROM providers
            WHERE accepts_new_patients = true
              AND (%s::text[] IS NULL OR care_types && %s)
              AND (%s::text IS NULL OR %s = 'either'
                   OR (%s = 'in_person' AND offers_in_person)
                   OR (%s = 'virtual' AND offers_virtual))
              AND (%s::text IS NULL OR %s = 'either'
                   OR (%s = 'va' AND is_va_facility)
                   OR (%s = 'community' AND NOT is_va_facility))
              AND (%s::text IS NULL OR %s = ANY(accepted_insurance)
                   OR 'any' = ANY(accepted_insurance))
            ORDER BY distance_miles ASC NULLS LAST
            LIMIT 50
            """,
            (
                pref["latitude"], pref["latitude"], pref["longitude"], pref["latitude"],
                pref["care_types"] or None, pref["care_types"] or None,
                pref["care_setting"], pref["care_setting"], pref["care_setting"], pref["care_setting"],
                pref["care_source"], pref["care_source"], pref["care_source"], pref["care_source"],
                pref["insurance_type"], pref["insurance_type"],
            ),
        )
        rows = cur.fetchall()
        columns = [d.name for d in cur.description]

    results = [dict(zip(columns, r, strict=False)) for r in rows]
    max_miles = pref["max_travel_miles"]
    if max_miles is not None:
        results = [
            r for r in results
            if r["distance_miles"] is None or r["distance_miles"] <= max_miles
        ]
    return results
