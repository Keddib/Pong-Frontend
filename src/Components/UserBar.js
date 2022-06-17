import User from "./User";
import Dots from "../../public/assets/icons/ellipsis.svg";

const UserBar = ({ user, settings }) => {
  return (
    <li className=" group flex rounded-l-2xl pr-6 py-1 items-center hover:border-pictonBlue hover:border w-full bg-queenBlue ">
      <div className="h-4/6 w-1 rounded-2xl mr-6 group-hover:bg-pictonBlue"></div>
      <User user={user} />
      <button className="w-10 h-10 " settings={settings}>
        <Dots className="fill-lotion/50 hover:fill-lotion" />
      </button>
    </li>
  );
};

export default UserBar;
