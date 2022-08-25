import SendIcon from "assets/icons/dm.svg";
import Heart from "assets/images/heart.png";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CoversationCard from "./Conversation";
import useMedia from "hooks/useMedia";
import { mediaQueries } from "config/index";
import useAuth from "hooks/useAuth";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { User } from "types/app";
import { Spinner } from "components/Loading";
import { Conversation } from "types/app";

const ConversationsList = () => {
  const [welcome, setWelcome] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const lg = useMedia(mediaQueries.lg);
  const [conversations, SetConversations] = useState([] as Conversation[]);
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const GetConversations = async () => {
      try {
        const res = await axiosPrivate.get<Conversation[]>("/friends/rooms");
        console.log("covs", res.data);
        SetConversations(res.data);
        setLoading(false);
      } catch (error) {
        console.log("fetch conv error", error);
      }
    };
    GetConversations();
    // get all conv
  }, []);

  useEffect(() => {
    console.log("location from chat", location);
    if (location.pathname == "/messages" && lg) {
      setWelcome(true);
    } else {
      setWelcome(false);
    }
  }, [location]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="min-w-[400px] h-full overflow-auto no-scrollbar">
        <div className="px-4 py-3 flex items-center gap-4 mb-4 rounded-3xl bg-queenBlue">
          <SendIcon className="w-6 fill-pictonBlue" />
          <h4>Messaging</h4>
        </div>
        <ul className="flex flex-col gap-1">
          {conversations.length ? (
            <>
              {conversations.map((conv) => (
                <CoversationCard key={conv.id} conversation={conv} />
              ))}
            </>
          ) : (
            <p>no conversations found</p>
          )}
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
