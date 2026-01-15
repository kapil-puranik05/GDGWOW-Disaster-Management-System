from flask import Flask, request, jsonify

def create_app(predict_fn):
    app = Flask(__name__)

    @app.route("/predict", methods=["POST"])
    def predict():
        payload = request.get_json()
        result = predict_fn(payload)
        return jsonify(result)

    return app
