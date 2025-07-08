# This code demonstrates how to create a vector database using LangChain and MongoDB.
# It loads documents from a MongoDB collection, splits them into smaller chunks, and creates a vector store using FAISS and HuggingFace embeddings.

from langchain_community.document_loaders.mongodb import MongodbLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
import os
import nest_asyncio
nest_asyncio.apply()

def load_database():

    loader = MongodbLoader(
        connection_string="mongodb://localhost:27017/",
        db_name="ecommerce_db",
        collection_name="products",
        field_names=["_id","name", "description", "price", "category"]
    )

    docs = loader.load()

    # print(docs[0].page_content)  # Print the content of the first document
    # print(docs[0].metadata)  # Print the metadata of the first document
    return docs

def create_vector_store(docs, save_path="faiss_index"):
 
    # Check if the FAISS index already exists
    if os.path.exists(save_path):
        vector_store = FAISS.load_local(save_path, HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2"),allow_dangerous_deserialization=True)
        print("Loaded existing FAISS index from disk.")
    else:
        # Split the documents into smaller chunks for better processing
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        documents = text_splitter.split_documents(docs)

        # embedding_model is used to convert text into vector embeddings
        Embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

        # Create a FAISS vector store from the documents
        vector_store = FAISS.from_documents(documents, Embeddings)

        # Save the vector store to disk
        vector_store.save_local(save_path)
        print("FAISS index created and saved to disk.")

    return vector_store