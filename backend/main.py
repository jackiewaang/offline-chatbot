from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(query: str):
    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "mistral", 
                "prompt": query,
                "stream": False
            }
        )
        return response.json()["response"]
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error communicating with Ollama: {str(e)}")
