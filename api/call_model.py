import pickle
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load the model

# model = pickle.load(open('model.pkl','rb'))

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    print("Hello, World! is being called")
    return "<p>Hello, World!</p>"

@app.route("/predict", methods=["POST"])
def predict(location):
    data = request.get_json()
    features = np.array([data['feature1'], data['feature2'], data['feature3']])  # Adjust feature names as needed
    prediction = model.predict([features])
    result = {"prediction": prediction[0]}
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, port=5000)