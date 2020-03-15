import { handleNewUser, handleDisconnectUser } from "./notifications";
import { handleNewMsg } from "./chat";
import { handleBeganPath, handleStrokedPath, handleFill } from "./paint";

let socket = null;

export const getSocket = () => socket;

export const initSocket = aSocket => {
  const { events } = window;
  socket = aSocket;
  socket.on(events.newUser, handleNewUser);
  socket.on(events.disconnected, handleDisconnectUser);
  socket.on(events.newMsg, handleNewMsg);
  socket.on(events.beganPath, handleBeganPath);
  socket.on(events.strokedPath, handleStrokedPath);
  socket.on(events.filled, handleFill);
};
