import RoomImg from "assets/images/friends.jpg";
import Image from "components/Image";
import { Conversation, Room, User } from "types/app";
import { FunctionComponent, useEffect, useState } from "react";
import useUserStatus from "hooks/useUserStatus";
import useAxiosPrivate from "hooks/useAxiosPrivate";


const RoomCard: FunctionComponent<{ room: Conversation }> = ({ room }) => {
  const { userStatus } = useUserStatus();
  const [status, setStatus] = useState("");
  const [avatar, setAvatar] = useState(RoomImg);
  const [name, setName] = useState(room.name);
  useEffect(() => {
    if (userStatus.userId == room.id) {
      setStatus(userStatus.status);
    }
    if (room.type == "private") {
      setName(room.members[0].nickname);
      setAvatar(room.members[0].nickname);
    }

  }, [userStatus, setStatus, room]);

  return (
    <div className="user-wrapper group">
      <div className="relative">
        <div className="rounded-full bg-queenBlue/50 w-10 h-10 sm:w-16 sm:h-16">
          <Image
            imageUrl={avatar}
            alt="user"
            className="user-img"
          />
        </div>
        <span className={status}></span>
      </div>
      <div className="group-hover:text-lotion/70 ml-4">
        <h4 className="text-sm sm:text-lg">{name}</h4>
      </div>
    </div>
  );
};

export default RoomCard;
