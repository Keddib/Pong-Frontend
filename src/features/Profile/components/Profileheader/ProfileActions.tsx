import DmIcon from "assets/icons/dm.svg";
import GamePad from "assets/icons/gamepad.svg";
import Ellipsis from "assets/icons/ellipsis.svg";
import Xmark from "assets/icons/xmark.svg";
import Block from "assets/icons/block-user.svg";
import Dropdown from "components/Dropdown";
import { FunctionComponent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "types/app";
import useProfileState from "../../hooks/useProfileState";
import useUserStatus from "~/src/hooks/useUserStatus";
import useCurrentGame from "~/src/hooks/useCurrentGame";

const Actions: FunctionComponent<{ user: User }> = ({ user }) => {
  const [show, setShow] = useState(false);

  const send = useProfileState().send;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.pathname;
  const { userStatus } = useUserStatus();
  const currentGameId = useCurrentGame(user.uid);

  const [inGame, setInGame] = useState(user.status == "playing");

  useEffect(() => {
    if (userStatus.userId == user.uid) {
      if (userStatus.status == "playing") setInGame(true);
      else setInGame(false);
    }
  }, [userStatus]);

  function showDropDown() {
    setShow(!show);
  }

  const handleInviteToPlayOrSpectateButton = () => {
    if (inGame) {
      navigate("/game?spectate=" + currentGameId);
    } else {
      const gameMode = "classic";
      navigate("/game", {
        state: { mode: gameMode, custom: { opponent: user.uid }, from }
      });
    }
  };

  const hundleBlock = () => {
    send({ type: "BLOCK" });
  };
  const hundleSendMessage = () => {
    navigate("/messages", { state: { receiver: user.uid } });
  };

  return (
    <div className="relative">
      <button className="group bell-button" onClick={showDropDown}>
        <Ellipsis className="iconBell" />
      </button>
      {show && (
        <Dropdown className="w-[200px]" close={() => setShow(false)}>
          <>
            <div className=" flex justify-end">
              <button onClick={showDropDown}>
                <Xmark className="w-5 h-5 fill-lotion/50 hover:fill-lotion" />
              </button>
            </div>
            <button
              className="send game request flex gap-2 items-center group"
              onClick={handleInviteToPlayOrSpectateButton}
            >
              {!inGame ? (
                <>
                  <GamePad className="w-6 h-6 fill-lotion/50  ease-in duration-150 group-hover:fill-lotion" />
                  Invite to play
                </>
              ) : (
                <>
                  <GamePad className="w-6 h-6 fill-lotion/50  ease-in duration-150 group-hover:fill-lotion" />
                  Spectate
                </>
              )}
            </button>
            <button
              className="start chating flex gap-2 items-center group"
              onClick={hundleSendMessage}
            >
              <DmIcon className="w-6 h-4  fill-lotion/50 group-hover:fill-lotion ease-in duration-150" />
              send message
            </button>

            <button
              className="start chating flex gap-2 items-center group"
              onClick={hundleBlock}
            >
              <Block className="w-6 h-4 fill-lotion/50 group-hover:fill-lotion ease-in duration-150" />
              block
            </button>
          </>
        </Dropdown>
      )}
    </div>
  );
};

export default Actions;
