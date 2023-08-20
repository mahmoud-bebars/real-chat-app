import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
  Chip,
} from "@material-tailwind/react";
import {
  PaperAirplaneIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import ScrollToBottom from "react-scroll-to-bottom";
const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const HandleSendMessage = async () => {
    if (message !== "") {
      const sendMessage = {
        id: Math.random(),
        room: room,
        author: username,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", sendMessage);
      const newMessages = [...messages, sendMessage];
      setMessages(newMessages);
      setMessage("");
    }
  };

  useEffect(() => {}, [socket]);
  socket.on("receive_message", async (data) => {
    const newMessages = [...messages, data];
    await setMessages(newMessages);
  });

  return (
    <Card className="mt-6 w-96">
      <CardHeader
        color="blue-gray"
        className="relative h-16 flex items-center justify-center"
      >
        <div className="flex items-center justify-center gap-2">
          <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
          <Typography>{room === "" ? "Anomynose" : room} Room </Typography>
          <Chip color="blue" value={username} variant="filled" />
        </div>
      </CardHeader>
      <CardBody className="h-[400px] overflow-y-auto">
        {messages.length > 0 ? (
          <ScrollToBottom className="h-[400px]">
            {messages.map((item, index) => {
              const islast = index === messages.length - 1;
              return (
                <div key={item.id} className="mt-1 flex-col mb-2">
                  {item.author === username ? (
                    <>
                      <div className="flex justify-end items-start">
                        <div className="flex-col w-auto items-end  rounded-lg">
                          <Chip
                            color="green"
                            value={`you: ${item.message}`}
                            variant="ghost"
                            className=" text-left mt-1 mb-2 w-full whitespace-break-spaces  capitalize break-words text-ellipsis"
                          />

                          <span className="text-xs h-full font-thin rounded-sm text-gray-300 ">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : item.author === "bot" ? (
                    <>
                      <div className="flex justify-center ">
                        <p className="text-gray-300 text-sm">
                          {item.message} - at: {item.time}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-start items-start">
                        <div className="flex-col w-auto items-end  p-2 rounded-lg">
                          <Chip
                            color="blue-gray"
                            value={`${item.author}: ${item.message}`}
                            variant="ghost"
                            className=" text-left mt-1 mb-2 w-full whitespace-break-spaces  capitalize break-words text-ellipsis"
                          />

                          <span className="text-xs h-full font-thin rounded-sm text-gray-300  ">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                  {!islast && <div className="w-full border  my-1" />}
                </div>
              );
            })}
          </ScrollToBottom>
        ) : (
          <>
            <Typography variant="lead" className="text-center pt-4">
              {" "}
              No messages...
            </Typography>
            <Typography variant="small" className="text-center pt-2">
              {" "}
              Send A message to the others now...
            </Typography>
          </>
        )}
      </CardBody>
      <CardFooter className="pt-3 " divider>
        <div className="relative flex w-full max-w-[30rem]">
          <Input
            type="text"
            label="send Message...."
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="pr-20"
            containerProps={{
              className: "min-w-0",
            }}
            onKeyUp={(e) => {
              e.key === "Enter" && HandleSendMessage();
            }}
          />
          <Button
            size="sm"
            className="!absolute right-1 top-1 rounded"
            disabled={message === ""}
            color={message !== "" ? "blue" : "blue-gray"}
            onClick={HandleSendMessage}
          >
            <div className="flex items-center gap-3 ">
              <span>Send</span>
              <PaperAirplaneIcon className="w-3 h-3" />
            </div>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Chat;
