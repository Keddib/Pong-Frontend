import Trash from "assets/icons/trash.svg";
import Leave from "assets/icons/logout.svg";
import Block from "assets/icons/block-user.svg";
import UserPlus from "assets/icons/user-plus.svg";
import { FunctionComponent, useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import { Conversation } from "types/app";
import GroupMember from "./GroupMember";
import GroupMembers from "./GroupMembers";
import GroupAdmins from "./GroupAdmins";

const GroupRoomInfo: FunctionComponent<{ conv: Conversation }> = ({ conv }) => {
  const [userPosition, setUserPosition] = useState(
    "" as "admin" | "owner" | "member"
  );
  const { user } = useAuth();

  useEffect(() => {
    if (conv.owner.uid == user.uid) {
      setUserPosition("owner");
    } else if (conv.admins.find((u) => u.uid == user.uid)) {
      setUserPosition("admin");
    } else {
      setUserPosition("member");
    }
  }, []);

  function leaveRoom() {
    //
  }
  function deleteRoom() {
    //
  }

  return (
    <>
      <h4>{conv.name} info</h4>
      <p>
        {conv.name}, {conv.members.length} memeber
      </p>
      {userPosition == "admin" || userPosition == "owner" ? <></> : <></>}
      <GroupMembers conv={conv} position={userPosition} />
      <GroupAdmins conv={conv} position={userPosition} />

      <button
        className="message-more-button group hover:text-red/70"
        onClick={leaveRoom}
      >
        <Leave className="w-6 h-4 fill-lotion/50 group-hover:fill-red/70 ease-in duration-150" />
        leave room
      </button>
      {userPosition == "owner" && (
        <button
          className="message-more-button group hover:text-red/70"
          onClick={deleteRoom}
        >
          <Trash className="w-6 h-4 fill-lotion/50 group-hover:fill-red/70 ease-in duration-150" />
          delete room
        </button>
      )}
      <p className="py-4 text-yonder">created by {conv.owner.nickname}</p>
    </>
  );
};
export default GroupRoomInfo;
