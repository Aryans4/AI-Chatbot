const API_KEY = "YOUR_API_KEY";

async function sendMessage(){

let input = document.getElementById("user-input");
let chatBox = document.getElementById("chat-box");

let userMessage = input.value;

chatBox.innerHTML += `<div>You: ${userMessage}</div>`;

input.value = "";

const response = await fetch("https://api.groq.com/openai/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer " + API_KEY
},
body:JSON.stringify({
model:"llama3-8b-8192",
messages:[
{role:"user",content:userMessage}
]
})
});

const data = await response.json();

let reply = data.choices[0].message.content;

chatBox.innerHTML += `<div>AI: ${reply}</div>`;
}