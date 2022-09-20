import UserPlus from "assets/icons/user-plus.svg";
import UserMinus from "assets/icons/user-minus.svg";
import Ban from "assets/icons/ban.svg";
import Mute from "assets/icons/mute.svg";
import { FunctionComponent, useEffect, useState } from "react";
import { Conversation } from "types/app";
import GroupMember from "./GroupMember";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import AddMemeberToGroup from "./GroupAddMemebers";

const GroupMembers: FunctionComponent<{
  conv: Conversation;
  position: string;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ conv, position, setRefresh }) => {
  const axiosPrivate = useAxiosPrivate();
  const [error, setError] = useState("");

  async function removeMember(mId: string) {
    try {
      await axiosPrivate.post("chat/removemember", {
        cid: conv.cid,
        uid: mId,
      });
      // refresh
      setRefresh((prev) => !prev);
    } catch (error) {
      setError("error! try again");
    }
  }

  async function setMemberAdmin(mId: string) {
    try {
      await axiosPrivate.post("chat/admin", {
        cid: conv.cid,
        uid: mId,
      });
      // refresh
      setRefresh((prev) => !prev);
    } catch (error) {
      setError("error! try again");
    }
  }
  async function banMember(mId: string) {
    try {
      await axiosPrivate.post("chat/ban", {
        cid: conv.cid,
        uid: mId,
      });
      // refresh
      setRefresh((prev) => !prev);
    } catch (error) {
      setError("error! try again");
    }
  }
  async function muteMember(mId: string) {
    try {
      await axiosPrivate.post("chat/mute", {
        //{ cid: string; uid: string; minutes: number }
        cid: conv.cid,
        uid: mId,
        minutes: 1,
      });
      // refresh
      setRefresh((prev) => !prev);
    } catch (error) {
      setError("error! try again");
    }
  }
  return (
    <div className="messages-members rounded-3xl bg-queenBlue/50 pt-2 pb-6 pl-1">
      <p className="py-2"> members</p>
      {(position == "admin" || position == "owner") && (
        <AddMemeberToGroup conv={conv} setRefresh={setRefresh} />
      )}
      <ul className="flex-col flex gap-1 ">
        {conv.members.map((member) => {
          if (
            conv.admins.find((ad) => ad.uid == member.uid) ||
            member.uid == conv.owner.uid
          ) {
            return <span key={member.uid} className="hidden"></span>;
          }
          return (
            <li key={member.uid} className=" flex items-center justify-between">
              <GroupMember member={member} className="">
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
                        onClick={() => {
                          banMember(member.uid);
                        }}
                      >
                        <Ban className="w-5 h-5  fill-lotion/50 group-hover:fill-lotion ease-in duration-150" />
                        ban
                      </button>
                      <button
                        className="start chating flex gap-2 items-center group text-lotion/50 hover:text-lotion"
                        onClick={() => {
                          muteMember(member.uid);
                        }}
                      >
                        <Mute className="w-6 h-6  fill-lotion/50 group-hover:fill-lotion ease-in duration-150" />
                        mute for one minute
                      </button>
                      {error && <p>{error}</p>}
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
