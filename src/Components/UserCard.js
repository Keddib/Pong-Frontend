import { Link } from "react-router-dom";

export default function UserCard({ user }) {

  var displayName = user.username;

  if (displayName?.length > 18) {
    displayName = displayName.substring(0, 17);
    displayName += '.';
  }

  return (
    <Link to={"/"} className="user-wrapper group">
      <div className="relative">
        <img alt="user" src={user.image_url} className="user-img" />
        <span className={user.statusColor}></span>
      </div>
      <div className="group-hover:text-lotion/70 ml-4">
        <h4>{displayName}</h4>
        <p>{user.username}</p>
      </div>
    </Link>
  );
}
