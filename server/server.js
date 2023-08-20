const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const { ioScoket } = require("./io");

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});

app.use(ioScoket(io));

/* io.on("connection", (socket) => {
  connect(socket);

  joinRoom(socket);

  sendMessage(socket);

  disconnect(socket);
}); */

server.listen(port, () => {
  console.log("🚀 Server is up...");
  console.log(`Running on port ${port}`);
});
