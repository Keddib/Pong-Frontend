import Profile from "assets/icons/user.svg";
import GamePad from "assets/icons/gamepad.svg";
import Glasses from "assets/icons/glasses.svg";
import Block from "assets/icons/block-user.svg";
import { FunctionComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "types/app";
import Spectate from "~/src/components/Spectate";

const PrivateRoomInfo: FunctionComponent<{
  user: User;
  setRefresh: (b: boolean) => void;
}> = ({ user, setRefresh }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleInviteToPlayButton = () => {
    const gameMode = "classic";
    navigate("/game", {
      state: {
        mode: gameMode,
        custom: { opponent: user.uid },
        from: location.pathname
      }
    });
  };

  const hundleBlock = () => {
    //
    console.log("action block");
    setRefresh(true);
  };

  const hundleSpectate = () => {
    //
    console.log("action spectate");
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

      {user.status == "playing" && <Spectate userId={user.uid} />}
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
export default PrivateRoomInfo;
