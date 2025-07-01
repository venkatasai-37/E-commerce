
from langchain_ollama import OllamaLLM
import os
from dotenv import load_dotenv
from vector_db import load_database  # Assuming you have a function to load documents from MongoDB
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from vector_db import create_vector_store  # Assuming you have a function to load the FAISS index

load_dotenv()
os.environ["HUGGINGFACEHUB_API_TOKEN"] = os.getenv("HUGGINGFACEHUB_API_TOKEN")
print("HuggingFace API Token loaded successfully.")

docs= load_database()  # Load documents from MongoDB or any other source
vector_store=create_vector_store(docs)  # Load or create the FAISS index

llm = OllamaLLM(model="llama3.2") # Initialize the LLM object correctly

# llm.invoke(query)

retriever=vector_store.as_retriever(search_type="similarity", search_kwargs={"k": 3})

prompt_template="""
You are a helpful and knowledgeable product assistant. Use only the information provided in the Context below to answer the User Question accurately.

Context:
{context}

User Question:
{question}

Only answer based on the context above. If the answer is not present, say "Sorry, I couldn't find the information." Be clear and concise.
 """

prompt=PromptTemplate(template=prompt_template,input_variables=["context","question"])

retrievalQA=RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True,
    chain_type_kwargs={"prompt":prompt}
)

# result = retrievalQA.invoke({"query": query})
# print(result['result'])

