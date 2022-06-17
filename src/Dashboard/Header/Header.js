import Profile from "../../Components/User";
import Bell from "../../../public/assets/icons/bell.svg";
import Star from "../../../public/assets/icons/star.svg";

function EX() {
  const userEX = {
    lvl: 12,
    ex: 1537,
  };

  return (
    <div className="EX">
      <Star className="fill-crayola w-14 mr-4" />
      <p className=" font-beaufort font-semibold text-2xl absolute top-4 left-3">
        {userEX.lvl}
      </p>
      <div className="flex flex-col justify-center grow ">
        <p>{`${userEX.ex}xp`}</p>
        <div className="w-full h-3 rounded-3xl bg-lotion/50">
          <div className="w-2/3 bg-crayola h-3 rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
}

export default function Headers({ user }) {
  return (
    <div className="DashHeader w-full">
      <EX />
      <div className="md:grow"></div>
      <div className="flex justify-between items-center w-full md:w-60 lg:w-80">
        <Profile user={user} />
        <button className="group">
          <Bell className="iconBell" />
        </button>
      </div>
    </div>
  );
}
