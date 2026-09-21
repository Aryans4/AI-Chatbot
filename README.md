# AI Chatbot 🤖

A modern, full-stack web-based AI chatbot built with **Node.js**, **Express**, and **Vanilla JavaScript**, powered by the **Groq API** for ultra-fast AI inference.

---

## ✨ Features

- 💬 **Interactive Chat Interface**: Sleek, responsive, and easy-to-use UI.
- ⚡ **Groq Cloud Integration**: Ultra-fast responses powered by Groq's high-speed inference engine.
- 🔒 **Secure Backend**: API keys are securely kept on the Node.js server and never exposed to the client.
- ⚙️ **Configurable Models**: Easily switch between LLM models via environment variables or request payload.
- 🌐 **Zero Frontend Build Step**: Pure HTML5, CSS3, and JavaScript — no heavy frontend build tooling required.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Fetch API)
- **Backend**: Node.js, Express.js
- **Environment Management**: `dotenv`
- **AI Provider**: [Groq Cloud API](https://console.groq.com/)

---

## 📁 Project Structure

```text
AI-Chatbot/
├── .env.example       # Template for environment variables
├── .gitignore         # Excludes node_modules and .env
├── chatbot.html       # Main chat interface
├── chatbot.css        # Styling and layout
├── chat.js            # Frontend chat interactions & API calls
├── package.json       # Node.js dependencies and scripts
├── server.js          # Express server and Groq proxy API
└── README.md          # Project documentation
```

---

## 🚀 Getting Started

Follow these steps to run the chatbot locally on your machine:

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- A Groq API Key (Get one for free at [Groq Console](https://console.groq.com/keys))

### 2. Clone the Repository
```bash
git clone https://github.com/Aryans4/AI-Chatbot.git
cd AI-Chatbot
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory by copying the example:
```bash
cp .env.example .env
```

Open `.env` and fill in your Groq API credentials:
```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=openai/gpt-oss-20b
PORT=3000
```

### 5. Start the Server
```bash
npm start
```
*(or `node server.js`)*

### 6. Open in Browser
Visit **`http://localhost:3000`** in your browser to start chatting!

---

## ⚙️ Environment Variables

| Variable | Description | Default |
| :--- | :--- | :--- |
| `GROQ_API_KEY` | **Required**. Your Groq API key | - |
| `GROQ_MODEL` | The default AI model to query | `openai/gpt-oss-20b` |
| `PORT` | The port the Express server listens on | `3000` |

---

## 🔌 API Reference

### `POST /api/chat`
Sends a message to the Groq API and returns the assistant's reply.

- **Request Body**:
  ```json
  {
    "message": "Hello, how are you?",
    "model": "openai/gpt-oss-20b"
  }
  ```
- **Response**:
  ```json
  {
    "reply": "Hello! I am doing well, how can I assist you today?"
  }
  ```

---

## 📄 License
This project is open source and available under the [ISC License](LICENSE).
