import express from "express";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import events from "./socket.event";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  res.render("home", {events});
});

export default app;
