import SendIcon from "assets/icons/dm.svg";
import Heart from "assets/images/heart.png";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Coversation from "./Conversation";
import useMedia from "hooks/useMedia";
import { mediaQueries } from "config";

const ConversationsList = () => {
  const [welcome, setWelcome] = useState(false);
  const location = useLocation();
  const lg = useMedia(mediaQueries.lg);

  useEffect(() => {
    console.log("location from chat", location);
    if (location.pathname == "/messages" && lg) {
      setWelcome(true);
    } else {
      setWelcome(false);
    }
  }, [lg, location]);

  return (
    <>
      <div className="min-w-[400px] h-full overflow-auto no-scrollbar">
        <div className="px-4 py-3 flex items-center gap-4 mb-4 rounded-3xl bg-queenBlue">
          <SendIcon className="w-6 fill-pictonBlue" />
          <h4>Messaging</h4>
        </div>
        <ul className="flex flex-col gap-1">
          <li>
            <Coversation />
          </li>
          <li>
            <Coversation />
          </li>
          <li>
            <Coversation />
          </li>
          <li>
            <Coversation />
          </li>
          <li>
            <Coversation />
          </li>
          <li>
            <Coversation />
          </li>
          <li>
            <Coversation />
          </li>
          <li>
            <Coversation />
          </li>
          <li>
            <Coversation />
          </li>
        </ul>
      </div>
      {welcome && (
        <div className="h-full w-full rounded-3xl bg-queenBlue/50 flex flex-col justify-center items-center">
          <img alt="heart drawing" src={Heart} className="w-32" />
          <h4>Pong messages</h4>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default ConversationsList;
