const { reciveMessage } = require("./reciveMessage");

const sendMessage = async (socket) => {
  socket.on("send_message", async (data) => {
    const message = data;
    await reciveMessage(socket, data, message);
  });
};

module.exports = { sendMessage };
