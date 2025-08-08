from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import openai
import os

app = FastAPI()

# ✅ CORS Fix: Allow Vercel Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://neuropath-cgtb.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_key = os.environ.get("OPENAI_API_KEY")

@app.post("/generate-quiz")
async def generate_quiz(request: Request):
    data = await request.json()
    topic = data.get("topic")
    grade = data.get("grade")

    prompt = f"Generate a {grade}-grade level quiz on the topic: {topic}. Include 5 multiple-choice questions with 4 options each and mark the correct answer."

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an educational assistant that generates quizzes."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=500
    )

    quiz = response.choices[0].message.content
    return {"quiz": quiz}
