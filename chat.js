const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const clearChatBtn = document.getElementById("clear-chat");
const modelSelect = document.getElementById("model-select");

function appendMessage(role, text) {
  const messageRow = document.createElement("div");
  messageRow.className = `message ${role}`;

  const messageContent = document.createElement("div");
  messageContent.className = "message-content";
  messageContent.textContent = text;

  messageRow.appendChild(messageContent);
  chatBox.appendChild(messageRow);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function clearChat() {
  chatBox.innerHTML = "";
}

async function sendMessage(event) {
  if (event) event.preventDefault();

  const userMessage = userInput.value.trim();

  if (!userMessage) {
    return;
  }

  appendMessage("user", userMessage);
  userInput.value = "";
  userInput.focus();

  const loadingMessage = document.createElement("div");
  loadingMessage.className = "message bot";
  const loadingContent = document.createElement("div");
  loadingContent.className = "message-content";
  loadingContent.textContent = "Thinking...";
  loadingMessage.appendChild(loadingContent);
  chatBox.appendChild(loadingMessage);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: userMessage,
        model: modelSelect.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || 'Failed to get a response.');
    }

    loadingContent.textContent = data.reply;
  } catch (error) {
    loadingContent.textContent = error.message || 'Something went wrong.';
  }
}

chatForm.addEventListener("submit", sendMessage);
clearChatBtn.addEventListener("click", clearChat);
