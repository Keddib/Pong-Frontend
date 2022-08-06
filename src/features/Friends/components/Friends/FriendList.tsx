import DmIcon from "assets/icons/dm.svg";
import GamePad from "assets/icons/gamepad.svg";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { User } from "types/app";
import ElementBar from "components/ElementBar";
import UserCard from "components/Usercard";

const FriendListItems: FunctionComponent<{ user: User }> = ({ user }) => {
  return (
    <ElementBar rank={-1}>
      <div className="w-full flex justify-between items-center">
        <UserCard user={user} />
        <div className="flex items-center gap-4 sm:gap-8 sm:mr-8">
          <button className="send game request">
            <GamePad className="w-6 h-6 sm:w-8 sm:h-8 fill-lotion/50 hover:fill-lotion ease-in duration-150" />
          </button>
          <button className="start chating">
            <DmIcon className="w-6 h-4 sm:w-8 sm:h-6 fill-lotion/50 hover:fill-lotion ease-in duration-150" />
          </button>
        </div>
      </div>
    </ElementBar>
  );
};

const FriendList: FunctionComponent<{ friends: User[] }> = ({ friends }) => {
  const friendsArray = friends.map((friend) => (
    <li key={friend.id}>
      <FriendListItems user={friend} />
    </li>
  ));

  return (
    <>
      {friendsArray.length ? (
        <>{friendsArray}</>
      ) : (
        <div className="w-full h-full flex justify-center items-center flex-col gap-4">
          <p>search for friens</p>
          <Link to="/rooms/players">serach page</Link>
        </div>
      )}
    </>
  );
};

export default FriendList;