import { FunctionComponent, useEffect, useState } from "react";
import MessageInput from "components/Messages/MessageInput";
import Messages from "components/Messages/Messages";
import useAuth from "hooks/useAuth";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { usersSocket } from "~/src/services/socket";
import { Message } from "types/app";

const PublicRoom: FunctionComponent<{ show: boolean }> = ({ show }) => {
  let [messages, setMessages] = useState([] as Message[]);
  const [msgFromsrv, setmsgFromsrv] = useState({} as Message);
  const [inputMessage, setInputMessage] = useState("");
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  // const [isConnected, setIsConnected] = useState(usersSocket.connected);
  // const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    usersSocket.emit("joinRoomToServer", "public");

    const getMessages = async () => {
      const res = await axiosPrivate.get(
        "http://localhost:3500/chat/messages/public"
      );
      if (Array.isArray(res.data)) {
        setMessages(res.data);
      }
    };
    getMessages().then(() => {
      usersSocket.on("msgToClient", (msg) => {
        if (msg.room != "public") return;
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
    });
  }, []);

  useEffect(() => {
    if (!msgFromsrv.text) return;

    setMessages([...messages, msgFromsrv]);
  }, [msgFromsrv]);

  useEffect(() => {
    if (!inputMessage.length) return;
    usersSocket.emit("msgToServer", {
      room: "public",
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

export default PublicRoom;
