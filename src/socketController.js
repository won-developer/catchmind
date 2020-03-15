import events from "./socket.event";

const socketController = socket => {
  const broadcast = (event, data) => {
    socket.broadcast.emit(event, data);
  };
  socket.on(events.setNickName, ({ nickname }) => {
    socket.nickname = nickname;
    broadcast(events.newUser, { nickname });
  });
  socket.on(events.disconnect, () => {
    broadcast(events.disconnected, { nickname: socket.nickname });
  });
  socket.on(events.sendMsg, ({ value }) => {
    broadcast(events.newMsg, { value, nickname: socket.nickname });
  });
  socket.on(events.beginPath, ({ x, y }) => {
    broadcast(events.beganPath, { x, y });
  });
  socket.on(events.strokePath, ({ x, y, color }) => {
    broadcast(events.strokedPath, { x, y, color });
  });
  socket.on(events.fill, ({ color }) => {
    broadcast(events.filled, { color });
  });
};

export default socketController;
