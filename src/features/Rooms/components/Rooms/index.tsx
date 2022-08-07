import Lock from "assets/icons/lock.svg";
import { Link } from "react-router-dom";
import Header from "./Header";

const RoomItem = () => {
  return (
    <Link
      to="/rooms"
      className="rounded-3xl w-[300px] bg-queenBlue/50 p-6 flex flex-col gap-2 relative"
    >
      <Lock className="absolute top-4 right-4 w-5 fill-lotion" />
      <h4 className="text-2xl">Room name</h4>
      <p className="text-lotion/70 text-xl normal-case font-light">
        room discription may be longer
      </p>
      <div className="grow"></div>
      <div className="flex justify-between">
        <p className="text-sm font-light text-lotion/50 flex items-center gap-2">
          <div className="rounded-full w-3 h-3 bg-electricGreen"></div>
          12 online
        </p>
        <p className="text-sm font-light text-lotion/50 flex items-center gap-2">
          <div className="rounded-full w-3 h-3 bg-yonder "></div>
          100 members
        </p>
      </div>
    </Link>
  );
};

const Rooms = () => {
  return (
    <>
      <Header />
      <div className="flex items-center justify-evenly flex-wrap gap-2">
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
      </div>
    </>
  );
};

export default Rooms;
