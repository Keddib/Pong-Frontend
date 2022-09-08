import { mediaQueries } from "config/index";
import useMedia from "hooks/useMedia";
import { FunctionComponent, useEffect, useState } from "react";
import ChatBarTabs from "./components/ChatBarTabs";
import PublicRoom from "./components/publicRoom";
import GameRoom from "./components/gameRoom";

const ChatBar: FunctionComponent<{ gameRoomId: string }> = ({ gameRoomId }) => {
  const xl = useMedia(mediaQueries.xl);
  const [currentRoom, setCurrentRoom] = useState("public");
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    if (!gameRoomId) {
      setCurrentRoom("public");
    } else {
      setCurrentRoom(gameRoomId);
    }
  }, [gameRoomId]);

  return (
    <aside className={`chat-bar ${!xl && "chat-bar-hidden"}`}>
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
            newMsg={newMsg}
          />
          <PublicRoom show={currentRoom == "public"} />
          {gameRoomId && (
            <GameRoom roomId={gameRoomId} show={currentRoom != "public"} />
          )}
        </div>
      </div>
    </aside>
  );
};

export default ChatBar;
