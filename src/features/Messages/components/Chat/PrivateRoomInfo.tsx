import Profile from "assets/icons/user.svg";
import GamePad from "assets/icons/gamepad.svg";
import Block from "assets/icons/block-user.svg";
import { FunctionComponent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "types/app";
import Spectate from "components/Spectate";
import useAxiosPrivate from "~/src/hooks/useAxiosPrivate";

const PrivateRoomInfo: FunctionComponent<{
  user: User;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ user, setRefresh }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();

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

  async function hundleBlock() {
    try {
      await axiosPrivate.post("/friends/block", {
        uid: user.uid
      });
      setRefresh((prev) => !prev);
      navigate("/messages");
    } catch (error) {
      setError("can't block user! please retry");
    }
  }

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

      {user.status == "playing" ? (
        <Spectate userId={user.uid} />
      ) : (
        <button
          className="message-more-button group"
          onClick={handleInviteToPlayButton}
        >
          <GamePad className="w-6 h-6 fill-lotion/50  ease-in duration-150 group-hover:fill-lotion" />
          invite to play
        </button>
      )}

      <button
        className="message-more-button group hover:text-red/70"
        onClick={hundleBlock}
      >
        <Block className="w-6 h-4 fill-lotion/50 group-hover:fill-red/70 ease-in duration-150" />
        block
      </button>
      {error && <p className="text-xs text-red/70 text-center">{error}</p>}
    </>
  );
};
export default PrivateRoomInfo;
