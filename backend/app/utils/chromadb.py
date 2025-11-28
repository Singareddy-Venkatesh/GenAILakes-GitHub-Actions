import chromadb

# Initialize Chroma client
client = chromadb.Client()

# Initialize collection
collection = client.create_collection("content_vectors")

# Function to insert vector data
def insert_vector_data(content_id: int, vector: list):
    collection.add(
        documents=[f"Content {content_id}"], 
        metadatas=[{"content_id": content_id}],
        embeddings=[vector]
    )

# Function to search vectors
def search_vectors(query_vector: list, top_k: int = 5):
    return collection.query(query_embeddings=[query_vector], n_results=top_k)
