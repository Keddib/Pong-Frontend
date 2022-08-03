import Xmark from "assets/icons/xmark.svg";
import HomeIcon from "assets/icons/house.svg";
import BoardIcon from "assets/icons/chart-simple.svg";
import ChatIcon from "assets/icons/comment-dots.svg";
import FriendsIcon from "assets/icons/user-group.svg";
import GroupIcon from "assets/icons/users.svg";
import ProfileIcon from "assets/icons/user-astronaut.svg";
import IconLink from "components/Iconlink";
import { FunctionComponent } from "react";
import useAuth from "hooks/useAuth";
import LogoutButton from "./LogoutButton";

type Props = {
  showNav: () => void;
};

const Navbar: FunctionComponent<Props> = (props) => {
  const { user } = useAuth();

  return (
    <nav className="show-nav">
      <IconLink page="home" showNav={props.showNav}>
        <HomeIcon className="nav-icon" />
      </IconLink>
      <IconLink page="leaderboard" showNav={props.showNav}>
        <BoardIcon className="nav-icon" />
      </IconLink>
      <IconLink page="messages" showNav={props.showNav}>
        <ChatIcon className="nav-icon" />
      </IconLink>
      <IconLink page="friends" showNav={props.showNav}>
        <FriendsIcon className="nav-icon" />
      </IconLink>
      <IconLink page="rooms" showNav={props.showNav}>
        <GroupIcon className="nav-icon" />
      </IconLink>
      <IconLink page={`profile/${user.username}`} showNav={props.showNav}>
        <ProfileIcon className="nav-icon" />
      </IconLink>
      <div className="sm:grow"> </div>
      <LogoutButton />
      <button onClick={props.showNav} className="group nav-btn">
        <Xmark className="nav-icon" />
      </button>
    </nav>
  );
};

export default Navbar;
