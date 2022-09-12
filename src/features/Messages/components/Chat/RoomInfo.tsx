import { FunctionComponent, useEffect, useState } from "react";
import { Conversation, User } from "types/app";
import useAuth from "hooks/useAuth";
import PrivateRoomInfo from "./PrivateRoomInfo";
import GroupRoomInfo from "./GroupRoomInfo";
import useUserStatus from "~/src/hooks/useUserStatus";

const RoomInfo: FunctionComponent<{
  conv: Conversation;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ conv, setRefresh }) => {
  const { user } = useAuth();
  const [convUser, setConvUser] = useState({} as User);
  const { userStatus } = useUserStatus();
  useEffect(() => {
    if (conv.type == "private") {
      const otherUser = conv.members.find((u) => u.uid != user.uid);
      if (otherUser) setConvUser(otherUser);
    }
  }, []);

  useEffect(() => {
    if (convUser.uid && userStatus.userId === convUser.uid) {
      setConvUser({ ...convUser, status: userStatus.status });
    }
  }, [userStatus]);

  return (
    <div className="message-more">
      {conv.type == "private" ? (
        <PrivateRoomInfo user={convUser} setRefresh={setRefresh} />
      ) : (
        <GroupRoomInfo conv={conv} setRefresh={setRefresh} />
      )}
    </div>
  );
};

export default RoomInfo;
