import json
from core.llm import generate_json_response

def evaluate_resume(resume_text: str) -> dict:
    system_prompt = """
    You are an elite Executive Career Agent AI.
    Your job is to analyze resumes and output a strict JSON payload.
    The JSON must contain:
    - "atsScore": (int 0-100) combining formatting, keyword density, and impact.
    - "insights": (string) a highly direct, 2-sentence summary of your analysis.
    - "improvements": (array of strings) 2-3 specific, tactical bullet points to improve the CV.
    - "probabilityIncrease": (float) estimated percentage increase in interview probability if fixed.
    - "matches": (array of strings) 2 to 3 top tier tech/corporate roles that match this profile.

    Ensure the output is 100% valid JSON. Do not include markdown formatting like ```json in the output.
    """
    try:
        response = generate_json_response(system_prompt, f"Resume Text:\n{resume_text}")
        return json.loads(response)
    except Exception as e:
        return {"error": str(e), "raw_response": response if 'response' in locals() else None}
