from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

BASE = "http://10.10.13.133:8080/public"


@app.post("/")
def fanout():
    payload = request.get_json(silent=True) or {}

    # ---- FIRST REQUEST: closest-ngos ----
    try:
        r1 = requests.post(f"{BASE}/closest-ngos", json=payload, timeout=10)
        try:
            closest = r1.json()
        except ValueError:
            return jsonify({"error": "closest-ngos returned invalid JSON"}), 502
    except Exception as e:
        return jsonify({"error": f"closest-ngos error: {str(e)}"}), 500

    # ---- SECOND REQUEST: emergency (non-blocking) ----
    emergency_result = None
    try:
        r2 = requests.post(f"{BASE}/emergency", json=payload, timeout=3)
        try:
            emergency_result = r2.json()
        except ValueError:
            emergency_result = {"error": "emergency returned invalid JSON"}
    except Exception as e:
        emergency_result = {"error": f"emergency failed: {str(e)}"}

    # ---- FINAL RESPONSE FORMAT (what RN expects!) ----
    return jsonify([closest, emergency_result]), 200


@app.get("/")
def health():
    return "Proxy OK", 200


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080)
