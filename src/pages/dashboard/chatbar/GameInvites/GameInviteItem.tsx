import { FunctionComponent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ElementBar from "~/src/components/ElementBar";
import UserCard from "~/src/components/Usercard";

import Check from "assets/icons/check.svg";
import Xmark from "assets/icons/xmark.svg";
import { User } from "~/src/types/app";

const GameInvite: FunctionComponent<{
  user: User;
  invitation: string;
  remove: () => void;
}> = ({ user, invitation, remove }) => {
  const navigate = useNavigate();
  return (
    <ElementBar rank={-1}>
      <div className="w-full flex justify-between items-center">
        <UserCard user={user} />
        <div className="flex items-center sm:gap-8 sm:mr-8">
          <button
            className="rounded-full hover:bg-red/10 p-[2px]"
            onClick={() => {
              remove();
              // setDone(hundleCancelRequest(ReqUid));
            }}
          >
            <Xmark className="w-6 h-6 sm:w-8 sm:h-8 fill-lotion/50 hover:fill-red ease-in duration-150" />
          </button>
          <button
            className="rounded-full hover:bg-electricGreen/10 p-[2px]"
            onClick={() => {
              navigate("/game?invitation=" + invitation);
              // setDone(hundleAccepteRequest(ReqUid));
            }}
          >
            <Check className="w-6 h-6 sm:w-8 sm:h-8 fill-lotion/50 hover:fill-electricGreen ease-in duration-150" />
          </button>
        </div>
      </div>
    </ElementBar>
  );
};

export default GameInvite;
