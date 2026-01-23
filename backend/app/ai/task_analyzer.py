def analyze_task(title: str, description: str | None):
    title_lower = title.lower()

    if "urgent" in title_lower or "asap" in title_lower:
        priority = "high"
        status = "in_progress"
        effort = "3–5 hours"
    else:
        priority = "medium"
        status = "pending"
        effort = "1–2 hours"

    return {
        "priority": priority,
        "summary": description or title,
        "estimated_effort": effort,
        "recommended_status": status,
    }
