const reciveMessage = async (socket, data, message) => {
  await socket.to(data.room).emit("receive_message", message);
};
module.exports = {
  reciveMessage,
};
