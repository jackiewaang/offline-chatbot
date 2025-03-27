from fastapi import FastAPI, HTTPException
import requests

app = FastAPI()

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
