const { joinRoom } = require("./events/joinRoom");
const { sendMessage } = require("./events/sendMessage");
const { disconnect } = require("process");
const { connect } = require("./events/connect");

const ioScoket = async (io) => {
  io.on("connection", (socket) => {
    connect(socket);

    joinRoom(socket);

    sendMessage(socket);

    disconnect(socket);
  });
};

module.exports = {
  ioScoket,
};
