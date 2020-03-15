import { getSocket } from "./sockets";

const canvas = document.getElementById("canvas");
const colors = document.querySelectorAll(".controls__color");
const fill = document.getElementById("fill");
const brush = document.getElementById("brush");
const range = document.getElementById("range");
const save = document.getElementById("save");
const ctx = canvas.getContext("2d");

const { events } = window;

const INIT = {
  color: "#000",
  width: 600,
  height: 600
};

let painting = false;
let filing = false;

const initCanvas = () => {
  canvas.width = INIT.width;
  canvas.height = INIT.height;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, INIT.width, INIT.height);
  ctx.strokeStyle = INIT.color;
  ctx.fillStyle = INIT.color;
  ctx.lineWidth = range.value;
};

const beginPath = (x, y) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
};

const strokePath = (x, y, color) => {
  let currentColor = ctx.strokeStyle;
  if (color) {
    ctx.strokeStyle = color;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.strokeStyle = currentColor;
};

const fillMode = color => {
  let currentColor = ctx.fillStyle;
  if (color) {
    ctx.fillStyle = color;
  }
  ctx.fillRect(0, 0, INIT.width, INIT.height);
  ctx.fillStyle = currentColor;
};

const onMouseMove = e => {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!filing) {
    if (!painting) {
      beginPath(x, y);
      getSocket().emit(events.beginPath, { x, y });
    } else {
      // 하위 경로의 마지막점을 x.y 좌표에 연결
      strokePath(x, y);
      getSocket().emit(events.strokePath, { x, y, color: ctx.strokeStyle });
    }
  }
};

const handleColorChange = e => {
  const black = "#000";
  const white = "#fff";
  const red = "#ff0000";
  const orange = "#ffa500";
  const yellow = "#ffff00";
  const green = "#008000";
  const sky = "#00dfff";
  const blue = "#0000ff";
  const purple = "#800080";
  const color = eval(e.target.classList[1]);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

const handleRangeChange = e => {
  const value = e.target.value;
  ctx.lineWidth = value;
};

const handleFillMode = () => {
  if (filing) {
    fillMode();
    getSocket().emit(events.fill, { color: ctx.fillStyle });
  }
};

const handleSaveImage = () => {
  const img = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = img;
  link.download = "Your image";
  link.click();
};

const stopPainting = () => {
  painting = false;
};

const startPainting = () => {
  painting = true;
};

export const handleBeganPath = ({ x, y }) => {
  beginPath(x, y);
};

export const handleStrokedPath = ({ x, y, color }) => {
  strokePath(x, y, color);
};

export const handleFill = ({ color }) => {
  fillMode(color);
};
if (canvas) {
  initCanvas();
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleFillMode);
  canvas.addEventListener("contextmenu", e => {
    e.preventDefault();
  });
  colors.forEach(color => {
    color.addEventListener("click", handleColorChange);
  });
  range.addEventListener("input", handleRangeChange);
  brush.addEventListener("click", () => {
    filing = false;
  });
  fill.addEventListener("click", () => {
    filing = true;
  });
  save.addEventListener("click", handleSaveImage);
}
