import Lock from "assets/icons/lock.svg";
import RightArrow from "assets/icons/right-long.svg";
import { FunctionComponent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "components/Modal";
import { Spinner } from "components/Loading";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Conversation } from "types/app";
import Header from "./Header";
import JoinRoom from "./JoinRoom";
import useAuth from "hooks/useAuth";

const RoomItem: FunctionComponent<{ room: Conversation }> = ({ room }) => {
  const [showModal, setShowModal] = useState(false);
  const [roomName, setRoomName] = useState(room.name);
  const { user } = useAuth();
  const navigate = useNavigate();
  const modal = showModal ? (
    <Modal>
      <JoinRoom setShowModal={setShowModal} conv={room} />
    </Modal>
  ) : null;

  useEffect(() => {
    if (room.name.length > 16) {
      const name: string = room.name.substring(0, 15) + ".";
      setRoomName(name);
    } else {
      setRoomName(room.name);
    }
  }, [room]);

  return (
    <>
      {modal}
      <div className="rounded-3xl w-[300px] bg-queenBlue/50 p-6 flex flex-col gap-2 relative shadow-lg">
        {room.type == "protected" && (
          <Lock className="absolute top-4 right-4 w-5 fill-lotion" />
        )}
        <div className="flex flex-col mt-4 gap-2">
          <h4 className="text-2xl ">{roomName}</h4>
          <p className="text-lotion/70 text-xl normal-case font-light">
            {room.description || "description may containe 50 character"}
          </p>
          <p className="text-sm font-light flex items-center gap-2 self-end ">
            members :
            <span className="text-electricGreen">{room.members.length}</span>
          </p>
        </div>
        <div className=" bg-lotion/30 h-[1px] rounded-3xl my-1"></div>
        <div className="woner flex items-center gap-2">
          {
            <>
              <img
                src={room.owner.avatar}
                alt="user"
                className="w-8 h-8 bg-queenBlue/50 rounded-full"
              />
              <Link to={`/profile/${room.owner.username}`}>
                <p>{room.owner.nickname}</p>
              </Link>
            </>
          }
          <button
            className=" grow group"
            onClick={() => {
              if (room.members.find((m) => m.uid == user.uid)) {
                navigate(`/messages/${room.cid}`);
              } else {
                setShowModal(true);
              }
            }}
          >
            <RightArrow className="w-8 fill-crayola/50 group-hover:fill-crayola ml-auto" />
          </button>
        </div>
      </div>
    </>
  );
};

const Rooms = () => {
  const [rooms, setRooms] = useState([] as Conversation[]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const [qeury, setQuery] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const rooms = async () => {
      try {
        const res = await axiosPrivate.get<Conversation[]>("chat/rooms");
        setRooms(res.data);
      } catch (error) {
        setError("failed loading rooms! please try again");
      }
      setloading(false);
    };
    console.log("------>");
    rooms();
  }, [qeury, refresh]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Header setQuery={setQuery} setRefresh={setRefresh} />
      <div className="flex flex-wrap gap-1">
        <>
          {error ? (
            <p className="w-full text-center">{error}</p>
          ) : (
            <RoomsList rooms={rooms} />
          )}
        </>
      </div>
    </>
  );
};

export default Rooms;

const RoomsList: FunctionComponent<{ rooms: Conversation[] }> = ({ rooms }) => {
  if (!rooms.length) return <p className="m-auto">No rooms found</p>;
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
