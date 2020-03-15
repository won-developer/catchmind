import { initSocket } from "./sockets";

const loginBox = document.getElementById("loginBox");
const gameBox = document.getElementById("gameBox");
const loginForm = document.getElementById("loginForm");
const nickname = localStorage.getItem("nickname");

const login = (nickname, i) => {
  const socket = io("/");
  const { events } = window;
  socket.emit(events.setNickName, { nickname });
  if (!i) {
    loginBox.classList.remove("show");
    gameBox.classList.add("show");
  }
  initSocket(socket);
};

if (nickname === null) {
  loginBox.classList.add("show");
} else {
  gameBox.classList.add("show");
  login(nickname, true);
}

const handleLoginForm = e => {
  e.preventDefault();
  const input = loginForm.querySelector("input");
  const value = input.value;
  input.value = "";
  localStorage.setItem("nickname", value);
  login(value, false);
};

loginForm.addEventListener("submit", handleLoginForm);
