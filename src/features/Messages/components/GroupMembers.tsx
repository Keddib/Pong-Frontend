import UserPlus from "assets/icons/user-plus.svg";
import UserMinus from "assets/icons/user-minus.svg";
import Ban from "assets/icons/ban.svg";
import Mute from "assets/icons/mute.svg";
import { FunctionComponent, useState } from "react";
import { Conversation } from "~/src/types/app";
import GroupMember from "./GroupMember";

const GroupMembers: FunctionComponent<{
  conv: Conversation;
  position: string;
}> = ({ conv, position }) => {
  const [show, setShow] = useState(false);

  function addMemeber() {
    //
    console.log("....->");
  }

  if (show) {
    return (
      <div className="messages-members rounded-3xl bg-queenBlue/50 pt-2 pb-6 pl-1">
        search for friends
      </div>
    );
  }

  return (
    <div className="messages-members rounded-3xl bg-queenBlue/50 pt-2 pb-6 pl-1">
      <p className="py-2"> members</p>
      {(position == "admin" || position == "owner") && (
        <button className="message-more-button group my-2" onClick={() => {}}>
          <UserPlus className="w-6 h-4 fill-lotion/50 group-hover:fill-lotion ease-in duration-150" />
          add member
        </button>
      )}
      <ul className="flex-col flex gap-1 ">
        {conv.members.map((member) => {
          return (
            <li key={member.uid} className=" flex items-center justify-between">
              <GroupMember member={member}>
                <>
                  {(position == "admin" || position == "owner") && (
                    <>
                      <button
                        className="start chating flex gap-2 items-center group text-lotion/50 hover:text-lotion"
                        onClick={() => {}}
                      >
                        <UserPlus className="w-6 h-6  fill-lotion/50 group-hover:fill-lotion ease-in duration-150" />
                        add as admin
                      </button>
                      <button
                        className="start chating flex gap-2 items-center group text-lotion/50 hover:text-lotion"
                        onClick={() => {}}
                      >
                        <UserMinus className="w-6 h-6  fill-lotion/50 group-hover:fill-lotion ease-in duration-150" />
                        remove
                      </button>
                      <button
                        className="start chating flex gap-2 items-center group text-lotion/50 hover:text-lotion"
                        onClick={() => {}}
                      >
                        <Ban className="w-5 h-5  fill-lotion/50 group-hover:fill-lotion ease-in duration-150" />
                        ban
                      </button>
                      <button
                        className="start chating flex gap-2 items-center group text-lotion/50 hover:text-lotion"
                        onClick={() => {}}
                      >
                        <Mute className="w-6 h-6  fill-lotion/50 group-hover:fill-lotion ease-in duration-150" />
                        mute for one houre
                      </button>
                    </>
                  )}
                </>
              </GroupMember>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GroupMembers;
