import React from "react";
import JoinRoomCard from "../components/JoinRoomCard";
import Chat from "../components/Chat";
const Home = ({ joinRoom, socket, username, room }) => {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white py-10 px-6 sm:py-32 lg:px-8">
        {username !== "" && room !== "" ? (
          <Chat socket={socket} username={username} room={room} />
        ) : (
          <JoinRoomCard joinRoom={joinRoom} />
        )}
      </main>
    </>
  );
};

export default Home;
