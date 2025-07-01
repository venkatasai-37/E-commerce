# app.py
from fastapi import FastAPI, HTTPException
from llm_chain import retrievalQA
import re

app = FastAPI()

@app.post("/chat")
async def chat_with_bot(query: dict):
    try:
        print(f"Received query: {query}")  # Debug input

        # Get result from retrievalQA
        result = retrievalQA.invoke({"query": query["query"]})
        print(f"Result from retrievalQA: {result}")  # Debug output
        source_docs = result.get("source_documents", [])
        product_ids = []

        for doc in source_docs:
            page_content = doc.page_content

            match = re.search(r"\b[a-fA-F0-9]{24}\b", page_content)
            if match:
                product_ids.append(match.group())
            else:
                print(f"Warning: No product ID found ")

        print(f"Extracted product IDs: {product_ids}")

        return {
            "result": result["result"],
            "product_ids": product_ids,

        }
    except Exception as e:
        print(f"Error during retrieval: {e}")
        raise HTTPException(status_code=500, detail=str(e))
