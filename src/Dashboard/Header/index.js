import UserImg from "/src/assets/images/user.jpg";
import Bell from "/src/assets/icons/bell.svg";
import UserCard from '/src/Components/UserCard';
import UserStarXP from "./components/UserStarXP";

const userXP = {
  lvl: 12,
  ex: 1537,
};

var user1 = {
  id: "123",
  img: UserImg,
  name: "AlaeOX7",
  status: "Online",
  dot: "green-dot"
};


export default function Headers() {
  return (
    <div className="DashHeader w-full">
      <UserStarXP user={userXP} />
      <div className="md:grow"></div>
      <div className="flex justify-between items-center w-full md:w-60 lg:w-80">
        <UserCard user={user1} />
        <button className="group">
          <Bell className="iconBell" />
        </button>
      </div>
    </div>
  );
}
