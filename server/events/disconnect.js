export const disconnect = (socket) => {
  socket.on("disconnect", () => {
    console.log("User: " + socket.id + " Disconnected!");
  });
};

module.exports = {
  disconnect,
};
