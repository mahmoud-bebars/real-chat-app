const connect = (socket) => {
  console.log("User: " + socket.id + " Connected!");
};

module.exports = { connect };
