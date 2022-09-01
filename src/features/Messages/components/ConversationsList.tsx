import SendIcon from "assets/icons/dm.svg";
import Heart from "assets/images/heart.png";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CoversationCard from "./Conversation";
import useMedia from "hooks/useMedia";
import { mediaQueries } from "config/index";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Spinner } from "components/Loading";
import { Conversation, Message } from "types/app";

type data = {
  room: Conversation;
  messages: Message[];
};

const ConversationsList = () => {
  const [welcome, setWelcome] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const lg = useMedia(mediaQueries.lg);
  const [conversations, SetConversations] = useState([] as Conversation[]);
  const axiosPrivate = useAxiosPrivate();
  const [activeRoom, setActiveRoom] = useState();

  useEffect(() => {
    const GetConversations = async () => {
      try {
        const res = await axiosPrivate.get<Conversation[]>("/friends/rooms");
        console.log("covs", res.data);
        SetConversations(res.data);
        setLoading(false);
      } catch (error) {
        console.log("fetch conv error", error);
        setError("something went wrong! please refresh");
        setLoading(false);
      }
    };
    GetConversations();
    // get all conv
  }, []);

  useEffect(() => {
    console.log("location from chat", location);
    if (
      (location.pathname == "/messages" || location.pathname == "/messages/") &&
      lg
    ) {
      setWelcome(true);
    } else {
      setWelcome(false);
    }
  }, [location, setWelcome, lg]);

  let content = (function content() {
    if (loading) {
      return <Spinner />;
    } else if (conversations.length) {
      //
      return (
        <>
          {conversations.map((conv) => (
            <CoversationCard key={conv.id} conversation={conv} />
          ))}
        </>
      );
    } else if (error) {
      <p className="text-center">{error}</p>;
    }
    return <p className="text-center">no conversations found</p>;
  })();

  return (
    <>
      <div className="min-w-[400px] h-full overflow-auto no-scrollbar">
        <div className="px-4 py-3 flex items-center gap-4 mb-4 rounded-3xl bg-queenBlue">
          <SendIcon className="w-6 fill-pictonBlue" />
          <h4>Messaging</h4>
        </div>
        <ul className="flex flex-col gap-1">{content}</ul>
      </div>
      {welcome && lg ? (
        <div className="h-full w-full rounded-3xl bg-queenBlue/50 flex flex-col justify-center items-center">
          <img alt="heart drawing" src={Heart} className="w-32" />
          <h4>Pong messages</h4>
        </div>
      ) : (
        <></>
      )}
      <Outlet />
    </>
  );
};

export default ConversationsList;
