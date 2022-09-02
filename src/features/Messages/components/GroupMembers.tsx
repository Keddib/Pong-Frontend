import UserPlus from "assets/icons/user-plus.svg";
import UserMinus from "assets/icons/user-minus.svg";
import Ban from "assets/icons/ban.svg";
import Mute from "assets/icons/mute.svg";
import { FunctionComponent, useState } from "react";
import { Conversation } from "types/app";
import GroupMember from "./GroupMember";
import useAxiosPrivate from "hooks/useAxiosPrivate";

const GroupMembers: FunctionComponent<{
  conv: Conversation;
  position: string;
  setRefresh: (b: boolean) => void;
}> = ({ conv, position, setRefresh }) => {
  const [show, setShow] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  function addMemeber() {
    //
    console.log("....->");
  }

  async function removeMember(mId: string) {
    try {
      await axiosPrivate.post("chat/removemember", {
        cid: conv.cid,
        uid: mId,
      });
      // refresh
      setRefresh(true);
    } catch (error) {
      console.log("error chat/admin", error);
    }
  }

  async function setMemberAdmin(mId: string) {
    console.log(conv.cid, mId);
    try {
      await axiosPrivate.post("chat/admin", {
        cid: conv.cid,
        uid: mId,
      });
      // refresh
      setRefresh(true);
    } catch (error) {
      console.log("error chat/admin", error);
    }
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
                        onClick={() => {
                          setMemberAdmin(member.uid);
                        }}
                      >
                        <UserPlus className="w-6 h-6  fill-lotion/50 group-hover:fill-lotion ease-in duration-150" />
                        add as admin
                      </button>
                      <button
                        className="start chating flex gap-2 items-center group text-lotion/50 hover:text-lotion"
                        onClick={() => {
                          removeMember(member.uid);
                        }}
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
