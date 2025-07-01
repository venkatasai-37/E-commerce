# vector_db.py
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.docstore.document import Document
import faiss

embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

def create_faiss_index(documents):
    return FAISS.from_documents(documents, embedding_model)

def load_faiss_index(path="faiss_index"):
    return FAISS.load_local(path, embedding_model,allow_dangerous_deserialization=True)

def save_faiss_index(vector_store, path="faiss_index"):
    vector_store.save_local(path)
