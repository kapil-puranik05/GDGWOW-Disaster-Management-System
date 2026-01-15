from app import create_app
from model.model import predict

app = create_app(predict)

if __name__ == "__main__":
    app.run(debug=True)
