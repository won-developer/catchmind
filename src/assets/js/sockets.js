import { handleNewUser, handleDisconnectUser } from "./notifications";
import { handleNewMsg } from "./chat";

let socket = null;

export const getSocket = () => socket;

export const initSocket = aSocket => {
  const { events } = window;
  socket = aSocket;
  socket.on(events.newUser, handleNewUser);
  socket.on(events.disconnected, handleDisconnectUser);
  socket.on(events.newMsg, handleNewMsg);
};
