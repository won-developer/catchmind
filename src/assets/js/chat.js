import { getSocket } from "./sockets";

const chatBox = document.getElementById("chatBox");
const chatSendForm = document.getElementById("chatSendForm");

const addMsg = (text, author) => {
  const nickname = author ? author : "나ss";
  const li = document.createElement("li");
  const name = document.createElement("span");
  const txt = document.createElement("span");
  name.innerText = `${nickname} : `;
  name.className = `author ${author ? "user" : "me"}`;
  txt.innerText = text;
  li.appendChild(name);
  li.appendChild(txt);
  chatBox.appendChild(li);
};

const handleChatSendForm = e => {
  e.preventDefault();
  const input = chatSendForm.querySelector("input");
  const { value } = input;
  const { events } = window;
  const socket = getSocket();
  socket.emit(events.sendMsg, { value });
  input.value = "";
  addMsg(value);
};

export const handleNewMsg = ({ value, nickname }) => {
  addMsg(value, nickname);
};

chatSendForm.addEventListener("submit", handleChatSendForm);
