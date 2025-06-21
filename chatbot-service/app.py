from fastapi import FastAPI
from pydantic import BaseModel
from recommender import recommend_products

app = FastAPI()

class Query(BaseModel):
    query: str

@app.post("/recommend")
def recommend(query: Query):
    results = recommend_products(query.query)
    return {"products": results}
