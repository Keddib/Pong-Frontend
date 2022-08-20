import Lock from "assets/icons/lock.svg";
import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "~/src/components/Loading";
import useAxiosPrivate from "~/src/hooks/useAxiosPrivate";
import Header from "./Header";

type roomType = "private" | "public" | "protected";

type ChatMessage = {
  messageId: string;
  text: string;
  roomId: string;
  ownerId: string;
  createdAt: Date;
};

type Room = {
  cid: string;
  type: roomType;
  owner: string;
  messages: ChatMessage[];
  createdAt: Date;
  name: string;
  password: string;
  admins: string[];
  banned: string[];
  description: string;
};

const RoomItem: FunctionComponent<{ room: Room }> = ({ room }) => {
  return (
    <Link
      to="/messages/coversationID"
      className="rounded-3xl w-[300px] bg-queenBlue/50 p-6 flex flex-col gap-2 relative"
    >
      <Lock className="absolute top-4 right-4 w-5 fill-lotion" />
      <h4 className="text-2xl">{room.name}</h4>
      <p className="text-lotion/70 text-xl normal-case font-light">
        room.description may be longer
      </p>
      <div className="grow"></div>
      <div className="flex justify-between">
        <p className="text-sm font-light text-lotion/50 flex items-center gap-2">
          <span className="rounded-full w-3 h-3 bg-electricGreen"></span>
          room admins : {room.admins}
        </p>
        <p className="text-sm font-light text-lotion/50 flex items-center gap-2">
          <span className="rounded-full w-3 h-3 bg-yonder "></span>
          room members:
        </p>
      </div>
    </Link>
  );
};

const Rooms = () => {
  const [rooms, setRooms] = useState([] as Room[]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const rooms = async () => {
      try {
        const res = await axiosPrivate.get<Room[]>(
          "http://localhost:3500/chat/rooms"
        );
        console.log("retrieved rooms ", res.data);
        setRooms(res.data);
      } catch (error) {
        setError("failed loading rooms! please try again");
      }
      setloading(false);
    };
    rooms();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-evenly flex-wrap gap-2">
        <>{error ? <p>{error}</p> : <RoomsList rooms={rooms} />}</>
      </div>
    </>
  );
};

export default Rooms;

const RoomsList: FunctionComponent<{ rooms: Room[] }> = ({ rooms }) => {
  if (!rooms.length) return <p>No rooms found</p>;
  else {
    return (
      <>
        {rooms.map((room, index) => (
          <RoomItem room={room} key={index} />
        ))}
      </>
    );
  }
};
