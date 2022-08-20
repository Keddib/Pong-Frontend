import RoomImg from "assets/images/friends.jpg";
import { Link } from "react-router-dom";
import Image from "components/Image";
import { Room } from "types/app";
import { FunctionComponent } from "react";

const RoomCard: FunctionComponent<{ room: Room }> = ({ room }) => {
  return (
    <Link to={"/messages" + room.id} className="user-wrapper group">
      <div className="relative">
        <div className="rounded-full bg-queenBlue/50 w-10 h-10 sm:w-16 sm:h-16">
          <Image
            imageUrl={room.avatar ? room.avatar : RoomImg}
            alt="user"
            className="user-img"
          />
        </div>
        <span className={room.status}></span>
      </div>
      <div className="group-hover:text-lotion/70 ml-4">
        <h4 className="text-sm sm:text-lg">{room.name}</h4>
      </div>
    </Link>
  );
};

export default RoomCard;