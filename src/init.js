import dotenv from "dotenv";
import app from "./app";
import socketIO from "socket.io";
import socketController from "./socketController";

dotenv.config();

const httpServer = app.listen(process.env.PORT, () =>
  console.log(`✅ HTTP SERVER ON http://localhost:${process.env.PORT}`)
);

const socketServer = socketIO.listen(httpServer);

socketServer.on("connection", socket => {
  socketController(socket);
});
