# app.py
from fastapi import FastAPI, HTTPException
from llm_chain import qa_chain

app = FastAPI()

@app.post("/chat")
async def chat_with_bot(query: dict):
    try:
        # Pass the correct input keys to the chain
        result = qa_chain.invoke({"question": query["query"]})
        return {"result": result["result"], "source_documents": result["source_documents"]}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
