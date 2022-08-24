import { mediaQueries } from "config/index";
import useMedia from "hooks/useMedia";
import { FunctionComponent, useState } from "react";
import ChatBarTabs from "./components/ChatBarTabs";
import PublicRoom from "./components/publicRoom";
import GameRoom from "./components/gameRoom";

const ChatBar: FunctionComponent<{ gameRoomId: string }> = ({ gameRoomId }) => {
  const xl = useMedia(mediaQueries.xl);
  const [currentRoom, setCurrentRoom] = useState("public");

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
                rooms={["public", gameRoomId]}
                currentRoom={currentRoom}
                setCurrentRoom={setCurrentRoom}
              />
              <PublicRoom show={currentRoom == "public"} />
              <GameRoom roomId={gameRoomId} show={currentRoom != "public"} />
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default ChatBar;
