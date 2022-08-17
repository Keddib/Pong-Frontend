import { mediaQueries } from "config/index";
import useMedia from "hooks/useMedia";
import Messages from "./components/Messages";
import MessageInput from "./components/MessageInput";
import { useEffect, useState } from "react";
import useAuth from "~/src/hooks/useAuth";
import GameInvites from "./GameInvites";

//
type Message = {
  sender: string;
  text: string;
  date: string;
};

const chats = [
  {
    sender: "keddib",
    text: "wash a saat",
    date: "10 min ago"
  },
  {
    sender: "malaoui",
    text: "wash a 3chiiri",
    date: "10 min ago"
  },
  {
    sender: "yahya",
    text: "drari chno ba9i lina",
    date: "11 min ago"
  }
];

const ChatBar = () => {
  const xl = useMedia(mediaQueries.xl);
  const [messages, setMessages] = useState([] as Message[]);
  const [inputMessage, setInputMessage] = useState("");
  const { user } = useAuth();
  useEffect(() => {
    // init sockets
    // fetch messages
    // setMessages( messages)
  }, []);

  useEffect(() => {
    // messegses
    // setMessahes([...messages, newMessage]);
  }, [messages]);

  useEffect(() => {
    // send message
    // setMessahes([...messages, newMessage]);
  }, [inputMessage]);

  return (
    <>
      {xl && (
        <aside className="chat-bar">
          <div className="h-full flex flex-col gap-2">
            <GameInvites />
            <div className="chat-section">
              <div className="Links flex items-center justify-evenly rounded-3xl bg-queenBlue/50 p-1">
                <div className="link link-active cursor-pointer">Public</div>
                <span className="bg-pictonBlue w-1 h-8 rounded-xl"></span>
                <div className="link link-active text-lotion/50">Game</div>
              </div>
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
