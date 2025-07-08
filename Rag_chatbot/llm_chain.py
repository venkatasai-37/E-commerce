from langchain_ollama import OllamaLLM
import os
from dotenv import load_dotenv
from vector_db import load_database 
from langchain.chains import RetrievalQA
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from vector_db import create_vector_store 
from langchain_core.runnables import RunnablePassthrough
from operator import itemgetter

load_dotenv()
os.environ["HUGGINGFACEHUB_API_TOKEN"] = os.getenv("HUGGINGFACEHUB_API_TOKEN")
print("HuggingFace API Token loaded successfully.")

docs= load_database()  
vector_store=create_vector_store(docs) 

llm = OllamaLLM(
    model="llama3.2",
    temperature=0.5,
    max_tokens=150,
    num_threads=4
    ) 


retriever=vector_store.as_retriever(search_type="similarity", search_kwargs={"k": 3})

prompt_template="""
You are a helpful product assistant.

Rules:
1. DO NOT answer based on any product documents unless the user explicitly asks about shopping, recommendations, buying, prices, or product details.
2. If the user says "hi", "hello", or asks general questions unrelated to products, respond like a friendly assistant — but DO NOT reference or retrieve any products.
3. If unsure, say: "I can help with product recommendations. Just tell me what you're looking for!"
4. Be helpful, concise, and clear. Only show products if truly asked.

Context:
{context}

User Question:
{question}

Answer:"""

prompt=PromptTemplate(template=prompt_template,input_variables=["context","question"])

retrievalQA=RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True,
    chain_type_kwargs={"prompt":prompt}
)

general_prompt="""

You are a friendly and polite e-commerce assistant. When a user greets you (e.g., says "hi" or "hello"), respond warmly and guide them to ask about products, offers, or categories.

User: {question}

Assistant:"""

general_prompt_template=PromptTemplate(template=general_prompt,input_variables=["question"])

general_chat_chain = (
    {"question": RunnablePassthrough()} 
    | general_prompt_template 
    | llm
)

