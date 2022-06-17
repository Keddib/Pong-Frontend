import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Xmark from "../../../public/assets/icons/xmark.svg";
import Bars from "../../../public/assets/icons/bars.svg";
import HomeIcon from "../../../public/assets/icons/house.svg";
import BoardIcon from "../../../public/assets/icons/chart-simple.svg";
import ChatIcon from "../../../public/assets/icons/comment-dots.svg";
import FriendsIcon from "../../../public/assets/icons/user-group.svg";
import GroupIcon from "../../../public/assets/icons/users.svg";
import ProfileIcon from "../../../public/assets/icons/user-astronaut.svg";
import Logout from "../../../public/assets/icons/logout.svg";
import Logo from "../../Components/Logo";
import IconWrap from "./components/Icon";

export default function NavBar() {
  const [tab, setTab] = useState("Home");
  const navRef = useRef(null);
  const showNavBar = (e) => {
    navRef.current.classList.toggle("show-nav");
    let ref = e.currentTarget.href;
    ref = ref.substring(ref.lastIndexOf("/") + 1);
    setTab(ref);
  };
  const logOut = () => {
    console.log("logout");
  };

  console.log(tab);
  console.log(tab == "profile");
  return (
    <div className="navbar">
      <Link to="/home">
        <Logo className="group-hover:animate-bounce" />
      </Link>
      <nav ref={navRef}>
        <IconWrap
          callBack={showNavBar}
          active={tab == "" ? true : false}
          page="/home"
          icon={<HomeIcon className="nav-icon" />}
        />
        <IconWrap
          callBack={showNavBar}
          active={tab == "loaderboard" ? true : false}
          page="/leaderboard"
          icon={<BoardIcon className="nav-icon" />}
        />
        <IconWrap
          callBack={showNavBar}
          page="/messages"
          icon={<ChatIcon className="nav-icon" />}
        />
        <IconWrap
          callBack={showNavBar}
          page="/friends"
          icon={<FriendsIcon className="nav-icon" />}
        />
        <IconWrap
          callBack={showNavBar}
          page="/groups"
          icon={<GroupIcon className="nav-icon" />}
        />
        <IconWrap
          callBack={showNavBar}
          active={tab == "profile" ? true : false}
          page="/profile"
          icon={<ProfileIcon className="nav-icon" />}
        />
        <div className="sm:grow"></div>
        <button onClick={logOut} className="group mt-4">
          <Logout className="nav-icon  group-hover:fill-red/80 " />
        </button>
        <button onClick={showNavBar} className="group nav-btn">
          <Xmark className="nav-icon" />
        </button>
      </nav>
      <button onClick={showNavBar} className="group nav-btn">
        <Bars className="nav-icon" />
      </button>
    </div>
  );
}
