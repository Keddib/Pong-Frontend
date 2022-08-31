import DmIcon from "assets/icons/dm.svg";
import Profile from "assets/icons/user.svg";
import GamePad from "assets/icons/gamepad.svg";
import Glasses from "assets/icons/glasses.svg";
import Trash from "assets/icons/trash.svg";
import Leave from "assets/icons/logout.svg";
import Ellipsis from "assets/icons/ellipsis.svg";
import UserPlus from "assets/icons/user-plus.svg";

// import Xmark from "assets/icons/xmark.svg";
import Block from "assets/icons/block-user.svg";
import { FunctionComponent, useEffect, useState } from "react";
import { Conversation, User } from "types/app";
import useAuth from "~/src/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import GroupMember from "./GroupMember";

const More: FunctionComponent<{ conv: Conversation }> = ({ conv }) => {
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
        <PrivateMore user={convUser} />
      ) : (
        <RoomMore conv={conv} />
      )}
    </div>
  );
};

export default More;

const PrivateMore: FunctionComponent<{ user: User }> = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleInviteToPlayButton = () => {
    const gameMode = "classic";
    navigate("/game", {
      state: {
        mode: gameMode,
        custom: { opponent: user.uid },
        from: location.pathname,
      },
    });
  };

  const hundleBlock = () => {
    //
  };
  const hundleSendMessage = () => {
    //
  };

  const hundleSpectate = () => {
    //
  };

  return (
    <>
      <button
        className="message-more-button group"
        onClick={() => {
          navigate(`/profile/${user.username}`);
        }}
      >
        <Profile className="w-5 h-5 fill-lotion/50  ease-in duration-150 group-hover:fill-lotion" />
        profile
      </button>
      {/* {user.status == "playing" && ( */}
      {user.status == "playing" && (
        <button className="message-more-button group" onClick={hundleSpectate}>
          <Glasses className="w-6 h-6 fill-lotion/50  ease-in duration-150 group-hover:fill-lotion" />
          spectate
        </button>
      )}
      <button
        className="message-more-button group"
        onClick={handleInviteToPlayButton}
      >
        <GamePad className="w-6 h-6 fill-lotion/50  ease-in duration-150 group-hover:fill-lotion" />
        invite to play
      </button>

      <button
        className="message-more-button group hover:text-red/70"
        onClick={hundleBlock}
      >
        <Block className="w-6 h-4 fill-lotion/50 group-hover:fill-red/70 ease-in duration-150" />
        block
      </button>
    </>
  );
};

const RoomMore: FunctionComponent<{ conv: Conversation }> = ({ conv }) => {
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
      <h4>room info</h4>
      <p>
        {conv.name}, {conv.members.length} memeber
      </p>
      {userPosition == "admin" || userPosition == "owner" ? <></> : <></>}
      <div className="messages-members rounded-3xl bg-queenBlue/50 pt-2 pb-6 pl-1">
        <p> {conv.members.length} member</p>
        <button className="message-more-button group my-2" onClick={deleteRoom}>
          <UserPlus className="w-6 h-4 fill-lotion/50 group-hover:fill-lotion ease-in duration-150" />{" "}
          add member
        </button>
        <ul className="flex-col flex gap-1 ">
          {conv.members.map((member) => {
            return (
              <li
                key={member.uid}
                className=" flex items-center justify-between"
              >
                <GroupMember member={member}>
                  <></>
                </GroupMember>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="messages-members rounded-3xl bg-queenBlue/50 pt-2 pb-6 pl-1">
        <p> {conv.admins.length} admins</p>
        <button className="message-more-button group my-2" onClick={deleteRoom}>
          <UserPlus className="w-6 h-4 fill-lotion/50 group-hover:fill-lotion ease-in duration-150" />{" "}
          add admin
        </button>
        <ul className="flex-col flex gap-1 ">
          {conv.admins.map((admin) => {
            return (
              <li
                key={admin.uid}
                className=" flex items-center justify-between"
              >
                <GroupMember member={admin}>
                  <></>
                </GroupMember>
              </li>
            );
          })}
        </ul>
      </div>
      <button
        className="message-more-button group hover:text-red/70"
        onClick={leaveRoom}
      >
        <Leave className="w-6 h-4 fill-lotion/50 group-hover:fill-red/70 ease-in duration-150" />{" "}
        leave room
      </button>
      {userPosition == "owner" && (
        <button
          className="message-more-button group hover:text-red/70"
          onClick={deleteRoom}
        >
          <Trash className="w-6 h-4 fill-lotion/50 group-hover:fill-red/70 ease-in duration-150" />{" "}
          delete room
        </button>
      )}
      <p className="py-4 text-yonder">created by {conv.owner.nickname}</p>
    </>
  );
};
