from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)

# ✅ Configure Gemini API with correct key
api_key = os.getenv("GEMINI_API_KEY")   # make sure .env has GEMINI_API_KEY=your_key
print("🔑 Gemini API Key loaded:", bool(api_key))  # Debug print

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message.strip():
        return jsonify({"response": "Please enter a message."})

    try:
        response = model.generate_content(user_message)

        # Some SDK versions return .text, others need .candidates[0].content.parts[0].text
        ai_reply = getattr(response, "text", None)
        if not ai_reply and hasattr(response, "candidates"):
            ai_reply = response.candidates[0].content.parts[0].text

        if not ai_reply:
            ai_reply = "⚠️ Sorry, I couldn't generate a response."

        return jsonify({"response": ai_reply})

    except Exception as e:
        return jsonify({"response": f"Error: {str(e)}"})

if __name__ == "__main__":
    app.run(debug=True)
