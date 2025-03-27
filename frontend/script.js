function sendMessage() {
    let inputField = document.getElementById("userInput");
    let message = inputField.value;
    if (message.trim() === "") return;
    
    let chatbox = document.getElementById("chatbox");
    let userMessage = `<p><strong>You:</strong> ${message}</p>`;
    chatbox.innerHTML += userMessage;
    inputField.value = "";
    
    setTimeout(() => {
        let botMessage = `<p><strong>Bot:</strong> Processing your request...</p>`;
        chatbox.innerHTML += botMessage;
    }, 1000);
}

function startVoice() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onresult = function(event) {
        let transcript = event.results[0][0].transcript;
        document.getElementById("userInput").value = transcript;
        sendMessage();
    };
    recognition.start();
}
function sendMessage() {
    let inputField = document.getElementById("userInput");
    let message = inputField.value;
    if (message.trim() === "") return;

    let chatbox = document.getElementById("chatbox");
    let userMessage = `<p><strong>You:</strong> ${message}</p>`;
    chatbox.innerHTML += userMessage;
    inputField.value = "";

    fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        let botMessage = `<p><strong>Bot:</strong> ${data.response}</p>`;
        chatbox.innerHTML += botMessage;
    })
    .catch(error => console.error("Error:", error));
}
function runScan() {
    let target = document.getElementById("userInput").value;

    fetch("http://127.0.0.1:5000/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: target })
    })
    .then(response => response.json())
    .then(data => {
        let botMessage = `<p><strong>Bot:</strong> Scan Results:<br>${data.scan_result}</p>`;
        document.getElementById("chatbox").innerHTML += botMessage;
    });
}
function speakMessage(text) {
    fetch("http://127.0.0.1:5000/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text })
    });
}
fetch("https://your-backend-url/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message })
})
.then(response => response.json())
.then(data => {
    let botMessage = `<p><strong>Bot:</strong> ${data.response}</p>`;
    document.getElementById("chatbox").innerHTML += botMessage;
});
