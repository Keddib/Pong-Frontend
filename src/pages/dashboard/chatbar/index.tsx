import { mediaQueries } from "config/index";
import useMedia from "hooks/useMedia";
import Messages from "components/Messages/Messages";
import MessageInput from "components/Messages/MessageInput";
import { FunctionComponent, useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import { io } from "socket.io-client";
import useAxiosPrivate from "hooks/useAxiosPrivate";

//
type Message = {
  text: string;
  date: Date;
  username: string;
  userId: string;
};

const socket = io("http://localhost:3500/", {
  withCredentials: true
});
const ChatBarTabs: FunctionComponent<{
  rooms: string[];
  currentRoom: string;
  setCurrentRoom: (room: string) => void;
}> = ({ rooms, currentRoom, setCurrentRoom }) => {
  return (
    <div className="Links flex items-center justify-evenly rounded-3xl bg-queenBlue/50 p-1">
      {rooms.map((r, i) => (
        <>
          {r == currentRoom ? (
            <>
              <div className="link link-active cursor-pointer">{r}</div>
              {i != rooms.length - 1 ? (
                <span className="bg-pictonBlue w-1 h-8 rounded-xl"></span>
              ) : (
                ""
              )}{" "}
            </>
          ) : (
            <>
              <div
                key={i}
                onClick={() => setCurrentRoom(r)}
                className="link link-active text-lotion/50"
              >
                {r}
              </div>
              {i != rooms.length - 1 ? (
                <span className="bg-pictonBlue w-1 h-8 rounded-xl"></span>
              ) : (
                ""
              )}
            </>
          )}
        </>
      ))}
    </div>
  );
};
const ChatBar = () => {
  const xl = useMedia(mediaQueries.xl);
  let [messages, setMessages] = useState([] as Message[]);
  const [msgFromsrv, setmsgFromsrv] = useState({} as Message);
  const [inputMessage, setInputMessage] = useState("");
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  const [currentRoom, setCurrentRoom] = useState("public");
  const rooms = ["public", "game", "support"];

  useEffect(() => {
    socket.emit("joinRoomToServer", currentRoom);

    const getData = async () => {
      const msgs = await axiosPrivate.get(
        "http://localhost:3500/chat/messages/" + currentRoom
      );
      console.log(msgs.data);
      setMessages(msgs.data);
    };
    getData().then(() => {
      console.log("init listener");

      socket.on("msgToClient", (msg) => {
        let newMessage: Message = {
          userId: msg["userId"],
          username: msg["username"],
          text: msg["text"],
          date: new Date()
        };
        console.log("received new msg from srv", newMessage, messages);
        console.log(" user id ", user.uid, " meg user id ", msg["userId"]);
        if (user.uid !== msg["userId"]) {
          console.log("received msg call stet ");
          setmsgFromsrv(newMessage);
        }
      });
    });
  }, [currentRoom]);

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
    socket.emit("msgToServer", { room: currentRoom, message: inputMessage });
    let newMessage: Message = {
      userId: user.uid,
      username: user.username,
      text: inputMessage,
      date: new Date()
    };

    setMessages([...messages, newMessage]);
  }, [inputMessage]);

  return (
    <>
      {xl && (
        <aside className="chat-bar">
          <div className="h-full flex flex-col gap-2">
            <div className="game-activity">
              <h4>Game Invitations</h4>
              <div className="h-28 overflow-auto"></div>
            </div>
            <div className="chat-section">
              <ChatBarTabs
                rooms={rooms}
                currentRoom={currentRoom}
                setCurrentRoom={setCurrentRoom}
              />
              <Messages messages={messages} />
              <MessageInput setMsg={setInputMessage} />
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default ChatBar;
