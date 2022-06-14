import Profile from "../../Components/UserWrapper";
import Bell from "../../../public/assets/icons/bell.svg"

export default function Headers({ user }) {
  return (
    <div className="DashHeader">
      <div className="EX">lol</div>
      <div className="grow"></div>
      <div className="flex justify-between items-center w-60">
        <Profile user={user} />
        <button className="group">
          <Bell className="iconBell" />
        </button>
      </div>
    </div>
  );
}
