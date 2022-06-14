import HomeIcon from "../../../public/assets/icons/house.svg";
import BoardIcon from "../../../public/assets/icons/chart-simple.svg";
import ChatIcon from "../../../public/assets/icons/comment-dots.svg";
import FriendsIcon from "../../../public/assets/icons/user-group.svg";
import GroupIcon from "../../../public/assets/icons/users.svg";
import ProfileIcon from "../../../public/assets/icons/user-astronaut.svg";
import Logout from "../../../public/assets/icons/logout.svg"
import Logo from "../../Components/Logo";
import IconWrap from "./components/Icon";


export default function NavBar() {
  return (
    <div className="navbar border-r-[1px] border-lotion/50">
      <div className=" h-full py-10 flex flex-col">
        <div className="mb-16 cursor-pointer flex justify-center ">
          <Logo className="group-hover:animate-bounce" />
        </div>
        <IconWrap page="/" icon={<HomeIcon className="nav-icon" />} />
        <IconWrap page="leaderboard" icon={<BoardIcon className=" nav-icon " />} />
        <IconWrap page="messages" icon={<ChatIcon className="nav-icon " />} />
        <IconWrap page="friends" icon={<FriendsIcon className="nav-icon " />} />
        <IconWrap page="groups" icon={<GroupIcon className=" nav-icon " />} />
        <IconWrap page="profile" icon={<ProfileIcon className="nav-icon " />} />
        <div className="grow"></div>
        <IconWrap icon={<Logout className="nav-icon " />} />
      </div>
    </div>
  );
}
