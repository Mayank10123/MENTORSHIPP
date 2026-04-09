import json
from core.llm import generate_json_response

def generate_roadmap(target_role: str, timeline_weeks: int) -> dict:
    system_prompt = f"""
    You are an elite Executive Career Agent AI defining highly tactical roadmaps.
    Create a detailed roadmap for a user aiming to become a '{target_role}' in '{timeline_weeks}' weeks.
    Output strict JSON with this exact shape:
    {{
       "role": "{target_role}",
       "timeline_weeks": {timeline_weeks},
       "milestones": [
           {{ "week": 1, "focus": "string description", "tasks": ["task 1", "task 2", "task 3"] }}
       ]
    }}
    Ensure output is 100% valid JSON. Provide all weeks requested. Do not wrap in ```json tags.
    """
    try:
        response = generate_json_response(system_prompt, "Generate the tactical execution roadmap now.")
        return json.loads(response)
    except Exception as e:
        return {"error": str(e), "raw_response": response if 'response' in locals() else None}
