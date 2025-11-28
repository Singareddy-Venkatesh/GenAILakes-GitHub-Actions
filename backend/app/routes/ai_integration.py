from fastapi import APIRouter, HTTPException
from app.utils import chromadb, ai_integration

router = APIRouter()

# Generate vector data using AI model (e.g., OpenAI, BERT)
@router.post("/generate_vector/{content_id}")
def generate_and_store_vector(content_id: int, content: str):
    # Example: Use AI model to generate vector (this part can be replaced with any AI model)
    vector = ai_integration.generate_vector(content)  # Replace with actual AI model call
    
    # Store the vector in ChromeDB
    chromadb.insert_vector_data(content_id, vector)
    return {"message": "Vector stored successfully."}

# Search for similar content using vector search
@router.post("/search_vectors")
def search_similar_vectors(query: str):
    vector = ai_integration.generate_vector(query)
    results = chromadb.search_vectors(vector)
    if not results:
        raise HTTPException(status_code=404, detail="No similar content found.")
    return {"results": results}
