import json
from core.llm import generate_json_response

def generate_nudge(streak: int, xp: int, risk_level: str) -> dict:
    system_prompt = """
    You are a predictive Behavioral AI Mentor.
    Analyze the user's progress and generate a precise, slightly intense, but constructive behavioral nudge.
    Don't be overly friendly, sound like a high-tier corporate executive coach.
    Output strict JSON with this shape:
    {
       "nudge_type": "motivational | warning | critical",
       "message": "The short text message to show the user."
    }
    Ensure output is 100% valid JSON without markdown wrapping.
    """
    user_prompt = f"User Data: Streak: {streak} days. Total XP: {xp}. Risk Dropoff Level: {risk_level} out of High/Medium/Low."
    try:
        response = generate_json_response(system_prompt, user_prompt)
        return json.loads(response)
    except Exception as e:
        return {"error": str(e), "raw_response": response if 'response' in locals() else None}
