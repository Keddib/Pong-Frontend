import { FunctionComponent, useEffect, useState } from "react";
import MessageInput from "components/Messages/MessageInput";
import Messages from "components/Messages/Messages";
import useAuth from "hooks/useAuth";
import { gameSocket } from "services/axios/socket";
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
    gameSocket.emit("joinRoomToServer", roomId);
    gameSocket.on("msgToClient", (msg) => {
      let newMessage: Message = {
        userId: msg["userId"],
        username: msg["username"],
        text: msg["text"],
        date: new Date(),
      };
      console.log("received new msg from srv", newMessage, messages);
      console.log(" user id ", user.uid, " meg user id ", msg["userId"]);
      if (user.uid !== msg["userId"]) {
        console.log("received msg call stet ");
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
    gameSocket.emit("msgToServer", {
      room: "public",
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
