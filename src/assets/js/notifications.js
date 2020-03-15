const body = document.querySelector("body");

const createNotification = (text, style) => {
  const box = document.createElement("div");
  box.className = "notification";
  box.innerText = text;
  box.style.backgroundColor = style;
  body.appendChild(box);
};

const removeNotification = () => {
  const notification = body.querySelectorAll(".notification");
  notification.forEach(i => {
    body.removeChild(i);
  });
};

export const handleNewUser = ({ nickname }) => {
  console.log(`접속한 사람 ${nickname}`);
  removeNotification();
  createNotification(`${nickname}님이 접속 했어요 🙅`, "#74b9ff");
};

export const handleDisconnectUser = ({ nickname }) => {
  console.log(`나간 사람 ${nickname}`);
  removeNotification();
  createNotification(`${nickname}님이 나갔어요 ⛔`, "#ff7675");
};
