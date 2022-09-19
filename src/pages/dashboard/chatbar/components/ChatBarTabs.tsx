import { FunctionComponent } from "react";

const ChatBarTabs: FunctionComponent<{
  rooms: [string, string];
  currentRoom: string;
  setCurrentRoom: (room: string) => void;
  newMsg: string;
}> = ({ rooms, currentRoom, setCurrentRoom, newMsg }) => {
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
          className={`text-sm font-semibold  hover:text-lotion ${
            currentRoom != rooms[0] && "text-lotion/50"
          }`}
        >
          public{" "}
          {currentRoom == rooms[0] && newMsg == rooms[0] ? (
            <span className="w-2 h-2 bg-red rounded-full"></span>
          ) : (
            <></>
          )}
        </p>
      </button>
      <span className="bg-pictonBlue w-1 h-8 rounded-xl"></span>
      <button onClick={hundleGame} disabled={!rooms[1]}>
        <p
          className={`text-sm font-semibold hover:text-lotion  ${
            rooms[1] && ""
          } ${currentRoom != rooms[1] && "text-lotion/50"}`}
        >
          game
        </p>
      </button>
    </div>
  );
};

export default ChatBarTabs;
