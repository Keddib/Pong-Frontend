import RoomImg from "assets/images/friends.jpg";
import Image from "components/Image";
import { Room } from "types/app";
import { FunctionComponent, useEffect, useState } from "react";
import useUserStatus from "~/src/hooks/useUserStatus";

const RoomCard: FunctionComponent<{ room: Room }> = ({ room }) => {
  const { userStatus } = useUserStatus();
  const [status, setStatus] = useState(room.status);

  useEffect(() => {
    if (userStatus.userId == room.uid) {
      setStatus(userStatus.status);
    }
  }, [userStatus, setStatus, room]);

  return (
    <div className="user-wrapper group">
      <div className="relative">
        <div className="rounded-full bg-queenBlue/50 w-10 h-10 sm:w-16 sm:h-16">
          <Image
            imageUrl={room.avatar ? room.avatar : RoomImg}
            alt="user"
            className="user-img"
          />
        </div>
        <span className={status}></span>
      </div>
      <div className="group-hover:text-lotion/70 ml-4">
        <h4 className="text-sm sm:text-lg">{room.name}</h4>
      </div>
    </div>
  );
};

export default RoomCard;
