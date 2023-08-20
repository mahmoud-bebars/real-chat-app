import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import io from "socket.io-client";
import { API } from "./constants/api";

const socket = io.connect(API);
console.log("socket Connection: " + socket.connected);
console.log(socket);

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const joinRoom = (values) => {
    socket.emit("join_room", values);
    setUsername(values.username);
    setRoom(values.room);
  };

  return (
    <>
      {/* Always put your JSX in A fragments to aviod any Errors beacuse 1 tags should be putten in the return. */}
      <Home
        joinRoom={joinRoom}
        socket={socket}
        username={username}
        room={room}
      />
    </>
  );
}

export default App;
