import { FunctionComponent } from "react";

const ChatBarTabs: FunctionComponent<{
  rooms: [string, string];
  currentRoom: string;
  setCurrentRoom: (room: string) => void;
}> = ({ rooms, currentRoom, setCurrentRoom }) => {
  function hundlePublic() {
    //
    setCurrentRoom(rooms[0]);
  }
  function hundleGame() {
    if (rooms[1]) {
      setCurrentRoom(rooms[1]);
    }
  }

  return (
    <div className="Links flex items-center justify-evenly rounded-3xl bg-queenBlue/50 p-1">
      <button onClick={hundlePublic}>
        <p
          className={`text-sm font-semibold text-lotion/50 hover:text-lotion ${
            currentRoom == rooms[0] && "text-lotion"
          }`}
        >
          public
        </p>
      </button>
      <span className="bg-pictonBlue w-1 h-8 rounded-xl"></span>
      <button onClick={hundleGame} disabled={!rooms[1]}>
        <p
          className={`text-sm font-semibold text-lotion/50 ${
            rooms[1] && "hover:text-lotion"
          } ${currentRoom == rooms[1] && "text-lotion"}`}
        >
          game
        </p>
      </button>
    </div>
  );
};

export default ChatBarTabs;
