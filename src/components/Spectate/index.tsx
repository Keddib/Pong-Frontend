import Glasses from "assets/icons/glasses.svg";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCurrentGame from "hooks/useCurrentGame";

const Spectate: FunctionComponent<{ userId: string }> = ({ userId }) => {
  const [text, setText] = useState("");
  const gameId = useCurrentGame(userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameId == "error") {
      setText("cant spectate!");
    } else if (gameId == "loading") {
      setText("please wait");
    } else if (gameId) {
      setText("spectate");
    }
  }, [gameId]);

  function hundleSpectate() {
    if (gameId && gameId != "error") {
      navigate("/game?spectate=" + gameId);
    }
  }

  return (
    <button className="message-more-button group" onClick={hundleSpectate}>
      <Glasses className="w-6 h-6 fill-lotion/50  ease-in duration-150 group-hover:fill-lotion" />
      {text}
    </button>
  );
};

export default Spectate;
