import { Link } from "react-router-dom";
import UserImg from "/src/assets/images/user.jpg";

export default function UserCard({ user }) {


  var displayName = user.username;

  if (displayName?.length > 18) {
    displayName = displayName.substring(0, 17);
    displayName += '.';
  }

  return (
    <Link to={"/"} className="user-wrapper group">
      <div className="relative">
        <div className="w-fit rounded-full bg-queenBlue/50">
          <img alt="user" src={UserImg} className="user-img" />
        </div>
        <span className={user.statusColor}></span>
      </div>
      <div className="group-hover:text-lotion/70 ml-4">
        <h4 className="text-sm sm:text-lg">{displayName}</h4>
        <p className="hidden sm:block text-sm">{user.username}</p>
      </div>
    </Link>
  );
}
