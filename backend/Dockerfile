FROM python:3.12-slim

WORKDIR /app

# Install build tools
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy Python dependencies
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY . .

# Expose FastAPI port
EXPOSE 8007

# Run server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8007"]
