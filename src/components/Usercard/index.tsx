import { Link } from "react-router-dom";
import Image from "components/Image";
import { User } from "types/app";
import { FunctionComponent, useEffect, useState } from "react";
import useUserStatus from "hooks/useUserStatus";

const UserCard: FunctionComponent<{ user: User }> = ({ user }) => {
  const { userStatus } = useUserStatus();
  const [status, setStatus] = useState(user.status);
  const [name, setName] = useState(user.nickname);

  useEffect(() => {
    if (userStatus.userId == user.uid) {
      setStatus(userStatus.status);
      user.status = userStatus.status;
    }
  }, [userStatus, setStatus, user]);

  useEffect(() => {
    if (name && name.length > 16) {
      setName(name.substring(0, 15) + ".");
    }
  }, [name]);

  return (
    <Link to={"/profile/" + user.username} className="user-wrapper group">
      <div className="relative">
        <div className="rounded-full bg-queenBlue/50 w-10 h-10 sm:w-16 sm:h-16">
          <Image imageUrl={user.avatar} alt="user" className="user-img" />
        </div>
        <span className={status}></span>
      </div>
      <div className="group-hover:text-lotion/70 ml-4">
        <h4 className="text-sm sm:text-lg">{name}</h4>
        <p className="hidden sm:block text-sm">{user.username}</p>
      </div>
    </Link>
  );
};

export default UserCard;
