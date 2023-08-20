const { reciveMessage } = require("./reciveMessage");

const joinRoom = async (socket) => {
  socket.on("join_room", async (data) => {
    await socket.join(data.room);
    const message = {
      id: Math.random(),
      room: "chat",
      author: "bot",
      message: `${data.username} joined the ${data.room} room`,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    await reciveMessage(socket, data, message);
    console.log(`user with ID: ${socket.id} Joined Room: ${data.room}`);
  });
};

module.exports = { joinRoom };
