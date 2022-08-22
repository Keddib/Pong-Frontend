import DmIcon from "assets/icons/dm.svg";
import GamePad from "assets/icons/gamepad.svg";
import { FunctionComponent, MouseEventHandler, useState } from "react";
import ElementBar from "components/ElementBar";
import UserCard from "components/Usercard";
import { User } from "types/app";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
const FriendListItem: FunctionComponent<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.pathname;

  interface CustomGamePayload {
    opponent: string;
  }
  const handleInviteToPlayButton = (e: any) => {
    const gameMode = "classic";
    navigate("/game", {
      state: { mode: gameMode, custom: { opponent: user.uid }, from },
    });
  };
  return (
    <ElementBar rank={-1}>
      <div className="w-full flex justify-between items-center">
        <UserCard user={user} />
        <div className="flex items-center gap-4 sm:gap-8 sm:mr-8">
          <button
            className="send game request"
            onClick={handleInviteToPlayButton}
          >
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

export default FriendListItem;
