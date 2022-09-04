import { FunctionComponent, useEffect, useState } from "react";
import MessageInput from "components/Messages/MessageInput";
import Messages from "components/Messages/Messages";
import useAuth from "hooks/useAuth";
import { usersSocket } from "services/axios/socket";
import { Message } from "types/app";

const GameRoom: FunctionComponent<{ show: boolean; roomId: string }> = ({
  show,
  roomId,
}) => {
  let [messages, setMessages] = useState([] as Message[]);
  const [msgFromsrv, setmsgFromsrv] = useState({} as Message);
  const [inputMessage, setInputMessage] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (!roomId) return;
    usersSocket.emit("joinRoomToServer", roomId);
    usersSocket.on("msgToClient", (msg) => {
      if (msg.room != roomId) return;

      let newMessage: Message = {
        userId: msg["userId"],
        username: msg["username"],
        text: msg["text"],
        date: new Date(),
      };
      if (user.uid !== msg["userId"]) {
        setmsgFromsrv(newMessage);
      }
    });
  }, [roomId]);
  useEffect(() => {
    if (!msgFromsrv.text) return;
    setMessages([...messages, msgFromsrv]);
  }, [msgFromsrv]);

  useEffect(() => {
    if (!inputMessage.length) return;
    usersSocket.emit("msgToServer", {
      room: roomId,
      message: inputMessage,
    });
    let newMessage: Message = {
      userId: user.uid,
      username: user.username,
      text: inputMessage,
      date: new Date(),
    };
    setMessages([...messages, newMessage]);
    setInputMessage("");
  }, [inputMessage]);

  return (
    <>
      {show && (
        <>
          <Messages messages={messages} />
          <MessageInput setMsg={setInputMessage} />
        </>
      )}
    </>
  );
};

export default GameRoom;
