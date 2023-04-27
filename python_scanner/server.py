from flask import Flask, jsonify,render_template,request
from flask_cors import CORS
from flask_json import FlaskJSON, JsonError, json_response, as_json
import json
import subprocess
import pickle
import json


app=Flask(__name__,template_folder='template')
CORS(app)
FlaskJSON(app)


with open('dt_model.pickle', 'rb') as f:
    dt_model = pickle.load(f)
with open('lr_model.pickle', 'rb') as f:
    lr_model = pickle.load(f)
with open('rf_model.pickle', 'rb') as f:
    rf_model = pickle.load(f)
with open('sv_model.pickle', 'rb') as f:
    sv_model = pickle.load(f)
# Load the exported variable from the JSON file
with open('accuracyd.json', 'r') as f:
    accuracyd = json.load(f)
with open('accuracyl.json', 'r') as f:
    accuracyl = json.load(f)
with open('accuracyf.json', 'r') as f:
    accuracyf = json.load(f)
with open('accuracyv.json', 'r') as f:
    accuracyv = json.load(f)

@app.route("/predict", methods=['POST'])
@as_json
def predict():
    #get request data 
    data = request.get_json()
    # Make predictions using the loaded model
    X = data['features']
    algorithm = data['algorithm']
    if algorithm == 'dt':
        y_pred = dt_model.predict(X)
    elif algorithm == 'lr':
        y_pred = lr_model.predict(X)
    elif algorithm == 'rf':
        y_pred = rf_model.predict(X)
    elif algorithm == 'sv':
        y_pred = sv_model.predict(X)
    # Return the predictions as a JSON response
    return jsonify({'predictions': y_pred.tolist()[0]})


@app.route("/accuracy", methods=['POST'])
@as_json
def accuracy():
    #get request data 
    data = request.get_json()
    # Make predictions using the loaded model
    algorithm = data['algorithm']
    if algorithm == 'dt':
        pred = accuracyd
    elif algorithm == 'lr':
        pred = accuracyl
    elif algorithm == 'rf':
        pred = accuracyf
    elif algorithm == 'sv':
        pred = accuracyv
    # Return the predictions as a JSON response
    return jsonify({'accuracy': pred['accuracy']})



