from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import openai
import os

app = Flask(__name__)

# Allow all CORS
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5500"}})

#openai.api_key = os.getenv("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", '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')
openai.api_key = os.getenv("OPENAI_API_KEY", 'OPENAI_API_KEY')

# Initial data.json
try:
    with open("data.json", "r") as f:
        data = json.load(f)
except FileNotFoundError:
    data = {"data": []}

# Helper function to save data to data.json
def save_data():
    with open("data.json", "w") as f:
        json.dump(data, f, indent=4)

# Endpoint to handle chatbot responses
@app.route("/chat", methods=["POST"])
def chat():
    if not request.is_json:
        return jsonify({"error": "Unsupported Media Type"}), 415

    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "Message not provided"}), 400

    for entry in data["data"]:
        if entry["question"] == user_input:
            return jsonify({"response": entry["answer"]})
    
    # Call OpenAI API if response is not found
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": user_input}]
    )
    answer = response['choices'][0]['message']['content']
    
    # Save the response in data.json
    data["data"].append({"question": user_input, "answer": answer})
    save_data()
    
    return jsonify({"response": answer})

# Endpoint to update bot responses
@app.route("/update", methods=["POST"])
def update():
    if not request.is_json:
        return jsonify({"error": "Unsupported Media Type"}), 415

    user_input = request.json.get("message")
    updated_response = request.json.get("response")
    if not user_input or not updated_response:
        return jsonify({"error": "Message or response not provided"}), 400

    for entry in data["data"]:
        if entry["question"] == user_input:
            entry["answer"] = updated_response
            save_data()
            return jsonify({"message": "Response updated successfully"})
    
    data["data"].append({"question": user_input, "answer": updated_response})
    save_data()
    
    return jsonify({"message": "Response updated successfully"})

if __name__ == "__main__":
    app.run(debug=True)
