import { FunctionComponent, useEffect, useState } from "react";
import MessageInput from "components/Messages/MessageInput";
import Messages from "components/Messages/Messages";
import useAuth from "hooks/useAuth";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { usersSocket } from "services/axios/socket";
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
      console.log("messages", res.data);
      if (Array.isArray(res.data)) {
        setMessages(res.data);
      }
    };
    getMessages().then(() => {
      console.log("init listener");

      usersSocket.on("msgToClient", (msg) => {
        if (msg.room != "public") return;
        let newMessage: Message = {
          userId: msg["userId"],
          username: msg["username"],
          text: msg["text"],
          date: new Date(),
        };
        console.log("received new msg from srv PIBLIC", newMessage, messages);
        console.log(" user id ", user.uid, " meg user id ", msg["userId"]);
        if (user.uid !== msg["userId"]) {
          console.log("received msg call stet ");
          setmsgFromsrv(newMessage);
        }
      });
    });
  }, []);

  useEffect(() => {
    // send message
    // setMessahes([...messages, newMessage]);
    // console.log('current user ', user)
    if (!msgFromsrv.text) return;

    setMessages([...messages, msgFromsrv]);
  }, [msgFromsrv]);

  // useEffect(() => {
  //   // messegses
  //   // setMessahes([...messages, newMessage]);
  // }, [messages]);

  useEffect(() => {
    // send message
    // setMessahes([...messages, newMessage]);
    // console.log('current user ', user)
    if (!inputMessage.length) return;
    usersSocket.emit("msgToServer", {
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

export default PublicRoom;
