import { Link } from "react-router-dom";
import Image from "./Image";

export default function UserCard({ user }) {



  var displayName = user.username;

  if (displayName?.length > 18) {
    displayName = displayName.substring(0, 17);
    displayName += '.';
  }

  return (
    <Link to={"/"} className="user-wrapper group">
      <div className="relative">
        <div className="rounded-full bg-queenBlue/50 w-10 h-10 md:w-16 md:h-16">
          <Image imageUrl={user.image_url} alt="user" className="user-img" />
        </div>
        <span className={user.statusColor}></span>
      </div>
      <div className="group-hover:text-lotion/70 ml-4">
        <h4 className="text-sm md:text-lg">{displayName}</h4>
        <p className="text-sm">{user.username}</p>
      </div>
    </Link>
  );
}
