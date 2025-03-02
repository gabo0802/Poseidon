import pickle
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from flask import Flask, request, jsonify

# Load the model

model = pickle.load(open('model.pkl','rb'))

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/predict", methods=["POST"])
def predict(location):
    data = request.get_json()
    features = np.array([data['feature1'], data['feature2'], data['feature3']])  # Adjust feature names as needed
    prediction = model.predict([features])
    result = {"prediction": prediction[0]}
    return jsonify(result)