from fastapi import FastAPI, HTTPException
from llm_chain import retrievalQA
import re
from llm_chain import general_chat_chain

app = FastAPI()

# Helper function to detect product-related queries
def is_product_query(text: str) -> bool:
    product_keywords = [
        "buy", "show", "recommend", "price", "under", "above", "find",
        "shirt", "jeans", "shoes", "dress", "shirts", "pants", "bag"
    ]
    return any(word in text.lower() for word in product_keywords)

# Extract product IDs from source documents
def extract_product_ids(source_docs):
    product_ids = []
    for doc in source_docs:
        match = re.search(r"\b[a-fA-F0-9]{24}\b", doc.page_content)
        if match:
            product_ids.append(match.group())
    return product_ids

@app.post("/chat")
async def chat_with_bot(query: dict):
    try:
        user_query = query["query"]
        print(f"Received query: {user_query}")

        if is_product_query(user_query):
            result = retrievalQA.invoke({"query": user_query})
            print(f"Result from retrievalQA: {result}")

            product_ids = extract_product_ids(result.get("source_documents", []))

            return {
                "result": result["result"],
                "product_ids": product_ids
            }

        else:
            # Handle general chat responses
            result = general_chat_chain.invoke(user_query)
            return {
                "result": result,  
                "product_ids": []
            }

    except Exception as e:
        print(f"Error during retrieval: {e}")
        raise HTTPException(status_code=500, detail=str(e))
