import { FunctionComponent, useEffect, useState } from "react";
import { Conversation, User } from "types/app";
import useAuth from "~/src/hooks/useAuth";
import PrivateRoomInfo from "./PrivateRoomInfo";
import GroupRoomInfo from "./GroupRoomInfo";

const RoomInfo: FunctionComponent<{ conv: Conversation }> = ({ conv }) => {
  const { user } = useAuth();
  const [convUser, setConvUser] = useState({} as User);

  useEffect(() => {
    if (conv.type == "private") {
      const otherUser = conv.members.find((u) => u.uid != user.uid);
      if (otherUser) setConvUser(otherUser);
    }
  }, []);

  return (
    <div className="message-more">
      {conv.type == "private" ? (
        <PrivateRoomInfo user={convUser} />
      ) : (
        <GroupRoomInfo conv={conv} />
      )}
    </div>
  );
};

export default RoomInfo;
