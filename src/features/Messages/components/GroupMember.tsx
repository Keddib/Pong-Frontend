import Ellipsis from "assets/icons/ellipsis.svg";
import Xmark from "assets/icons/xmark.svg";
import GamePad from "assets/icons/gamepad.svg";
import DmIcon from "assets/icons/dm.svg";
import Image from "components/Image";
import { User } from "types/app";
import { FunctionComponent, useEffect, useState } from "react";
import useUserStatus from "hooks/useUserStatus";
import useAuth from "hooks/useAuth";
import ElementBar from "components/ElementBar";
import Dropdown from "~/src/components/Dropdown";

const GroupMember: FunctionComponent<{
  member: User;
  children: JSX.Element[] | JSX.Element;
}> = ({ member, children }) => {
  const { user } = useAuth();
  const { userStatus } = useUserStatus();
  const [status, setStatus] = useState(member.status);
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    if (userStatus.userId == member.uid) {
      setStatus(userStatus.status);
    }
  }, [userStatus, setStatus, member]);

  return (
    <ElementBar rank={-1}>
      <div className="w-full flex justify-between items-center">
        <div className="user-wrapper group cursor-auto">
          <div className="relative">
            <Image
              imageUrl={member.avatar}
              alt="user"
              className="user-img w-10 h-10"
            />
            <span className={`${status} top-8 w-2 h-2`}></span>
          </div>
          <div className=" ml-4">
            <h4 className="text-sm">
              {user.uid == member.uid ? "You" : member.nickname}
            </h4>
          </div>
        </div>
        <div className="relative">
          <button
            className="group bell-button bg-spaceCadet/50 hover:bg-spaceCadet w-8 h-8"
            onClick={() => {
              setDrop(!drop);
            }}
          >
            <Ellipsis className="iconBell group-hover:bg-transparent" />
          </button>
          {drop && (
            <Dropdown className="top-8 w-60">
              <>
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setDrop(!drop);
                    }}
                  >
                    <Xmark className="w-5 h-5 fill-lotion/50 hover:fill-lotion" />
                  </button>
                </div>
                <button
                  className="send game request flex gap-2 items-center group"
                  onClick={() => {}}
                >
                  <GamePad className="w-6 h-6 fill-lotion/50  ease-in duration-150 group-hover:fill-lotion" />
                  invite to play
                </button>
                <button
                  className="start chating flex gap-2 items-center group"
                  onClick={() => {}}
                >
                  <DmIcon className="w-6 h-4  fill-lotion/50 group-hover:fill-lotion ease-in duration-150" />
                  send message
                </button>
                {children}
              </>
            </Dropdown>
          )}
        </div>
      </div>
    </ElementBar>
  );
};

export default GroupMember;
