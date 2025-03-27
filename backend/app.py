from flask import Flask, request, jsonify
import openai
import os
from dotenv import load_dotenv
import subprocess
import pyttsx3

load_dotenv()  # Load API key from .env file

app = Flask(__name__)

openai.api_key = os.getenv("OPENAI_API_KEY")

engine = pyttsx3.init()

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": "You are a cybersecurity expert AI assistant."},
                  {"role": "user", "content": user_input}]
    )

    return jsonify({"response": response["choices"][0]["message"]["content"]})

@app.route("/scan", methods=["POST"])
def scan():
    target = request.json.get("target", "")

    if not target:
        return jsonify({"error": "No target provided"}), 400

    result = subprocess.run(["nmap", "-F", target], capture_output=True, text=True)
    return jsonify({"scan_result": result.stdout})

@app.route("/speak", methods=["POST"])
def speak():
    text = request.json.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    engine.say(text)
    engine.runAndWait()
    return jsonify({"status": "Speaking"})

if __name__ == "__main__":
    app.run(debug=True)
