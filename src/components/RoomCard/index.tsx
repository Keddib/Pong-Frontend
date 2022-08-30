import RoomImg from "assets/images/friends.jpg";
import Image from "components/Image";
import { Conversation, User } from "types/app";
import { FunctionComponent, useEffect, useState } from "react";
import useUserStatus from "hooks/useUserStatus";
import useAuth from "~/src/hooks/useAuth";

const RoomCard: FunctionComponent<{ room: Conversation }> = ({ room }) => {
  const { userStatus } = useUserStatus();
  const { user } = useAuth();
  const [status, setStatus] = useState("");
  const [avatar, setAvatar] = useState(RoomImg);
  const [name, setName] = useState(room.name);
  const [currentUser, setCurrentUser] = useState({} as User);

  useEffect(() => {
    if (userStatus.userId == currentUser.uid) {
      setStatus(userStatus.status);
    }
    if (room.type == "private") {
      const otherUser = room.members.find((u) => u.uid != user.uid);
      if (otherUser) {
        setName(otherUser.nickname);
        setAvatar(otherUser.avatar);
        setCurrentUser(otherUser);
      }
    }
  }, [userStatus]);

  useEffect(() => {
    if (name.length > 16) {
      setName(name.substring(0, 15) + ".");
    }
  }, [name]);

  return (
    <div className="user-wrapper group w-fit overflow-hidden">
      <div className="relative">
        <div className="rounded-full bg-queenBlue/50 w-10 h-10 sm:w-16 sm:h-16">
          <Image imageUrl={avatar} alt="user" className="user-img" />
        </div>
        <span className={status}></span>
      </div>
      <div className="group-hover:text-lotion/70 ml-4 w-fit max-w-[200px] break-words">
        <h4 className="text-sm sm:text-lg break-words">{name}</h4>
      </div>
    </div>
  );
};

export default RoomCard;
