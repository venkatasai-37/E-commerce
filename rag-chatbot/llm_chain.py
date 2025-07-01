# llm_chain.py
from langchain.chains import RetrievalQA
from langchain.llms import HuggingFaceHub
from langchain.prompts import PromptTemplate
from vector_db import load_faiss_index
from dotenv import load_dotenv
import os

# Load .env for HF API token
load_dotenv()
os.environ["HUGGINGFACEHUB_API_TOKEN"]  # Ensure it's set

# Load FAISS vector store
vector_store = load_faiss_index()

# Initialize LLM
llm = HuggingFaceHub(
    repo_id="mistralai/Mistral-7B-Instruct-v0.2",
    model_kwargs={"temperature": 0.3, "max_new_tokens": 300}
)

# Create custom prompt template
custom_prompt = PromptTemplate(
    input_variables=["context", "question"],
    template="""
You are a helpful product assistant. Use the following product data to answer the user's question.

Context:
{context}

User Question:
{question}

Only answer based on the context above. If the answer is not present, say "Sorry, I couldn't find the information." Be clear and concise.
"""
)

# Build QA chain using prompt
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vector_store.as_retriever(search_type="similarity", search_kwargs={"k": 5}),
    chain_type_kwargs={"prompt": custom_prompt},
    return_source_documents=True
)
