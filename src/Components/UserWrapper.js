import { Link } from "react-router-dom";

export default function UserWrapper({ user }) {
  return (
    <Link to={user.id} className="user-wrapper group">
      <div className="relative">
        <img alt="user" src={user.img} className="user-img" />
        <span className={user.dot}></span>
      </div>
      <div className="group-hover:text-lotion/70">
        <h4>{user.name}</h4>
        <p>{user.status}</p>
      </div>
    </Link>
  );
}
