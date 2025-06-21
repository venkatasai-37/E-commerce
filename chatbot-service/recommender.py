from pymongo import MongoClient
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import os

# Load config from environment
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
DB_NAME = os.getenv("DB_NAME", "ecommerce_db")
COLLECTION_NAME = "products"

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
products_col = db[COLLECTION_NAME]

# Load products
PRODUCTS = list(products_col.find({}, {"_id": 0, "name": 1, "description": 1, "category": 1}))

# Prepare text
PRODUCT_TEXTS = [
    f"{p['name']} {p['description']} {p['category']}"
    for p in PRODUCTS
]

# Load model + compute embeddings
MODEL = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
PRODUCT_EMBS = MODEL.encode(PRODUCT_TEXTS)

def recommend_products(query, top_n=3):
    query_emb = MODEL.encode([query])
    sims = cosine_similarity(query_emb, PRODUCT_EMBS).flatten()
    top_idx = sims.argsort()[::-1][:top_n]
    return [PRODUCTS[i] for i in top_idx]
