from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import login, profile
from app.api.endpoints import leads, social_media, analytics

app = FastAPI(
    title="Vision99 API",
    description="FastLeads99 Backend API Service",
    version="0.1.0",
    openapi_version="3.1.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Vision99 API"}

# Include routes
app.include_router(login.router)
app.include_router(profile.router)
app.include_router(social_media.router, prefix="/users", tags=["Users"])
app.include_router(leads.router, prefix="/api/endpoints", tags=["Leads"])
app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8007)
