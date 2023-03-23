const socket = io();

var textarea = document.querySelector("#textarea");
var name;
var chatarea = document.querySelector(".message_area");

do {
  name = prompt("Enter Username");
} while (!name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    mymsg(e.target.value);
  }
});

const mymsg = (msg) => {
  var message = {
    user: name,
    msg: msg,
  };
  socket.emit("message", message);
  appendmessage(message, "outgoing");
};

function appendmessage(msg, type) {
  var maindiv = document.createElement("div");
  maindiv.classList.add(type, "message");
  var contnet = "<h4>" + msg.user + "</h4><p>" + msg.msg + "</p>";
  var div = chatarea.appendChild(maindiv);
  div.innerHTML = contnet;

  
}

socket.on("message", (msg) => {
  appendmessage(msg, "incoming");
});
