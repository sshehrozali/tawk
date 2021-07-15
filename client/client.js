const ENDPOINT = "http://localhost:3000";                    // Connect with server
const socket = io(ENDPOINT);

// Events Handling (Client-side)
// When new connection is established
socket.on("newChat", data => {
    const username = prompt("Enter your name to join the chat: ");
    newuser('You');
    socket.emit("newUserjoined", username);                 // Emit new user 
});
// When new User joins the chat
socket.on("newUseralert", data => {
    newuser(data);
});
// When new message is arrived
socket.on("sendMsg", data => {
    receive(data.message, data.name);
});

// New Message
document.getElementById("button-addon2").addEventListener("click", e => {
    console.log("Hello World");
    e.preventDefault();                                     // Prevents form from submitting

    msgInput = document.getElementById("messageInput");     // Get message
    msg = msgInput.value;
    send(msg);
    socket.emit("newMsg", msg);                             // Emits the msg to the server
    msgInput.value = "";
});





// Function to create new user alert
function newuser(username) {
    const msgCont = document.getElementById("messageContainer");        // Select msg container

    // Create new <p> -> Add classes
    const newUseralertbox = document.createElement("p");
    newUseralertbox.classList.add("card-text");
    newUseralertbox.classList.add("text-dark");
    newUseralertbox.classList.add("fs-6");
    newUseralertbox.classList.add("text-center");
    newUseralertbox.classList.add("p-3");

    newUseralertbox.innerText = username + " joined the chat";       // Insert username
    msgCont.appendChild(newUseralertbox);       // Append in message container
};

// Function to send Msg
function send(data) {
    const msgCont = document.getElementById("messageContainer");        // Select msg container

    // Create 'row'
    const row = document.createElement("div");
    row.classList.add("d-flex");
    row.classList.add("justify-content-end");
    row.classList.add("mb-3");

    // Create div for new msg -> Add classes
    const newDiv = document.createElement("div");
    newDiv.classList.add("sentMsgBox");
    newDiv.classList.add("px-5");

    // Create <p> -> Add classes
    const newChildDiv = document.createElement("p");
    newChildDiv.classList.add("card-text");

    newChildDiv.innerText = data;       // Insert msg inside <p>

    newDiv.appendChild(newChildDiv);    // Append <p> inside new div
    row.appendChild(newDiv)             // Append 'newDiv' inside 'row'
    msgCont.appendChild(row);           // Append 'row' inside 'msgCont'
};

// Function to receive new Msg
function receive(data, name) {
    const msgCont = document.getElementById("messageContainer");        // Select msg container

    // Create 'row'
    const row = document.createElement("div");
    row.classList.add("d-flex");
    row.classList.add("justify-content-start");
    row.classList.add("mb-3");

    // Create div for new msg -> Add classes
    const newDiv = document.createElement("div");
    newDiv.classList.add("receivedMsgBox");
    newDiv.classList.add("px-5");

    // Create <span> -> Add classes
    const usernameDiv = document.createElement("p");
    usernameDiv.classList.add("fs-6");
    usernameDiv.classList.add("mb-3");
    usernameDiv.classList.add("text-muted");

    // Create <p> -> Add classes
    const newChildDiv = document.createElement("p");
    newChildDiv.classList.add("card-text");

    usernameDiv.innerText = name;       // Insert name inside <span>
    newChildDiv.innerText = data;       // Insert msg inside <p>

    newDiv.appendChild(usernameDiv);    // Append <span> inside new div
    newDiv.appendChild(newChildDiv);    // Append <p> inside new div
    row.appendChild(newDiv)             // Append 'newDiv' inside 'row'
    msgCont.appendChild(row);           // Append 'row' inside 'msgCont'
}
