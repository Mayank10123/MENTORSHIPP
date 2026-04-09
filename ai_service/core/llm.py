import os
from groq import Groq
from dotenv import load_dotenv
from pathlib import Path

# Load .env from the ai_service directory
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(env_path)

# Initialize the Groq client gracefully
api_key = os.environ.get("GROQ_API_KEY", "")
client = Groq(api_key=api_key) if api_key else None

MODEL_NAME = "llama-3.1-8b-instant"

def generate_json_response(system_prompt: str, user_prompt: str) -> str:
    """
    Standardized function to query Groq and enforce strict JSON output.
    Uses the fast LLaMA 3.1 8B Instruct model.
    """
    if not client:
        # Fallback or error if keys aren't set
        return '{"error": "GROQ_API_KEY not configured in ai_service/.env"}'

    completion = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.3,
        response_format={"type": "json_object"},
    )
    return completion.choices[0].message.content
