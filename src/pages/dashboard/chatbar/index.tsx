import { mediaQueries } from "config/index";
import useMedia from "hooks/useMedia";
import MessageInput from "./components/MessageInput";

const ChatBar = () => {
  const xl = useMedia(mediaQueries.xl);

  return (
    <>
      {xl && (
        <aside className="chat-bar">
          <div className="h-full flex flex-col gap-2">
            <div className="game-activity border">
              <h4>Game Invitatios</h4>
            </div>
            <div className="chat-section">
              <div className="chat-messages"></div>
              <MessageInput />
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default ChatBar;
