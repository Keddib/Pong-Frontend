import { FunctionComponent, useEffect, useState } from "react";
import MessageInput from "components/Messages/MessageInput";
import Messages from "components/Messages/Messages";
import useAuth from "hooks/useAuth";
import { usersSocket } from "~/src/services/socket";
import { Message } from "types/app";

const GameRoom: FunctionComponent<{ show: boolean; roomId: string }> = ({
  show,
  roomId,
}) => {
  let [messages, setMessages] = useState([] as Message[]);
  const [msgFromsrv, setmsgFromsrv] = useState({} as Message);
  const [inputMessage, setInputMessage] = useState("");
  const { user } = useAuth();
  const recognizableRoomId = "GAME_" + roomId;
  useEffect(() => {
    if (!roomId) return;

    usersSocket.emit("joinRoomToServer", recognizableRoomId);
    usersSocket.on("msgToClient", (msg) => {
      if (msg.room != recognizableRoomId) return;

      let newMessage: Message = {
        ownerId: msg["ownerId"],
        username: msg["username"],
        text: msg["text"],
        date: new Date(),
      };
      if (user.uid !== msg["ownerId"]) {
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
      room: recognizableRoomId,
      message: inputMessage,
    });
    let newMessage: Message = {
      ownerId: user.uid,
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
          <MessageInput setMsg={setInputMessage} mute={false} />
        </>
      )}
    </>
  );
};

export default GameRoom;
