import { mediaQueries } from "config/index";
import useMedia from "hooks/useMedia";
import Messages from "./components/Messages";
import MessageInput from "./components/MessageInput";
import { useEffect, useState } from "react";

const ChatBar = () => {
  const xl = useMedia(mediaQueries.xl);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // fetch messages
    // messegses
    // setMessahes(...messages, );
  }, []);

  return (
    <>
      {xl && (
        <aside className="chat-bar">
          <div className="h-full flex flex-col gap-2">
            <div className="game-activity">
              <h4>Game Invitatios</h4>
              <div className="h-24"></div>
            </div>
            <div className="chat-section">
              <div className="Links flex items-center justify-evenly rounded-3xl bg-queenBlue/50 p-1">
                <div className="link link-active cursor-pointer">Public</div>
                <span className="bg-pictonBlue w-1 h-8 rounded-xl"></span>
                <div className="link link-active text-lotion/50">Game</div>
              </div>
              <Messages messages={messages} />
              <MessageInput />
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default ChatBar;
