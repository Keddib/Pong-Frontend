import UserMinus from "assets/icons/user-minus.svg";
import Ban from "assets/icons/ban.svg";
import Mute from "assets/icons/mute.svg";
import { FunctionComponent } from "react";
import { Conversation } from "types/app";
import GroupMember from "./GroupMember";
import useAxiosPrivate from "hooks/useAxiosPrivate";

const GroupAdmins: FunctionComponent<{
  conv: Conversation;
  position: string;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ conv, position, setRefresh }) => {
  const axiosPrivate = useAxiosPrivate();

  async function removeAdmin(adId: string) {
    console.log(conv.cid, adId);
    try {
      await axiosPrivate.post("chat/deleteadmin", {
        cid: conv.cid,
        uid: adId,
      });
      // refresh
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("error chat/admin", error);
    }
  }

  async function banMember(mId: string) {
    console.log(conv.cid, mId);
    try {
      await axiosPrivate.post("chat/ban", {
        cid: conv.cid,
        uid: mId,
      });
      // refresh
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("error chat/ban", error);
    }
  }
  async function muteMember(mId: string) {
    console.log(conv.cid, mId);
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
      console.log("error chat/mute", error);
    }
  }

  return (
    <div className="messages-members rounded-3xl bg-queenBlue/50 pt-2 pb-6 pl-1">
      <p className="py-2">admins</p>
      <ul className="flex-col flex gap-1 ">
        {conv.admins.map((admin) => {
          if (admin.uid == conv.owner.uid) {
            return <span key={conv.owner.uid} className="hidden"></span>;
          }
          return (
            <li key={admin.uid} className=" flex items-center justify-between">
              <GroupMember member={admin} className="">
                <>
                  {position == "owner" && (
                    <>
                      <button
                        className="start chating flex gap-2 items-center group text-lotion/50 hover:text-lotion"
                        onClick={() => {
                          removeAdmin(admin.uid);
                        }}
                      >
                        <UserMinus className="w-6 h-6  fill-lotion/50 group-hover:fill-lotion ease-in duration-150" />
                        remove admin
                      </button>
                      <button
                        className="start chating flex gap-2 items-center group text-lotion/50 hover:text-lotion"
                        onClick={() => {
                          banMember(admin.uid);
                        }}
                      >
                        <Ban className="w-6 h-6  fill-lotion/50 group-hover:fill-lotion ease-in duration-150" />
                        ban
                      </button>
                      <button
                        className="start chating flex gap-2 items-center group text-lotion/50 hover:text-lotion"
                        onClick={() => {
                          muteMember(admin.uid);
                        }}
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

export default GroupAdmins;
