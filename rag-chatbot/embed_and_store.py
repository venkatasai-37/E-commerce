# embed_and_store.py
from pymongo import MongoClient
from langchain.docstore.document import Document
from vector_db import create_faiss_index, save_faiss_index

client = MongoClient("mongodb://localhost:27017/")
db = client["ecommerce_db"]
products = list(db.products.find({}))
print(f"Found {len(products)} products in the database.")
docs = []
for product in products:
    content = f"Name: {product['name']}\nPrice: {product['price']}\nDescription: {product['description']}"
    docs.append(Document(page_content=content, metadata={"id": str(product["_id"])}))

vector_store = create_faiss_index(docs)
save_faiss_index(vector_store)
print("✅ Embeddings stored in FAISS.")
