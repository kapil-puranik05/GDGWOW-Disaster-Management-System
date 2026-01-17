from flask import Flask, request, jsonify
from flask_cors import CORS
from pathlib import Path
import re
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Flask Setup
app = Flask(__name__)
CORS(app)

# Load Documents
DATA_DIR = Path("data")
documents = []

for file in DATA_DIR.glob("*.txt"):
    with open(file, "r", encoding="utf-8") as f:
        documents.append(f.read())

# Chunking
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=100
)

chunks = text_splitter.split_text("\n\n".join(documents))

#Load embedding model
model = SentenceTransformer(
    "all-MiniLM-L6-v2",
    cache_folder="models"
)

#FAISS Setup
INDEX_PATH = "faiss.index"

if Path(INDEX_PATH).exists():
    index = faiss.read_index(INDEX_PATH)
else:
    embeddings = model.encode(chunks, convert_to_numpy=True)
    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(embeddings)
    faiss.write_index(index, INDEX_PATH)

# Search Function
def search(query, k=4):
    query_embedding = model.encode([query])
    distances, indices = index.search(query_embedding, k)
    return [chunks[i] for i in indices[0]]

# Pointwise formatting function
def format_pointwise(results, max_points=8):
    text = " ".join(results)
    raw_points = re.split(r'\n+|\. ', text)

    cleaned = []
    seen = set()

    for p in raw_points:
        p = p.strip(" :-•\n").strip()

        if len(p) < 25:
            continue
        if p.lower().startswith(("if ", "when ", "note")):
            continue

        key = p.lower()
        if key not in seen:
            seen.add(key)
            cleaned.append("• " + p)

        if len(cleaned) >= max_points:
            break

    return "\n".join(cleaned)

# Chatbot function
def chatbot(query):
    results = search(query)
    return format_pointwise(results)

# API Endpoint
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    query = data.get("query", "").strip()

    if not query:
        return jsonify({"error": "Query is required"}), 400

    response = chatbot(query)
    return jsonify({"response": response})

# Run Server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
