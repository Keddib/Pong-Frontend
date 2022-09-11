import SendIcon from "assets/icons/dm.svg";
import Heart from "assets/images/heart.png";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CoversationCard from "./Conversation";
import useMedia from "hooks/useMedia";
import { mediaQueries } from "config/index";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Spinner } from "components/Loading";
import { Conversation, Message } from "types/app";
import { usersSocket } from "services/socket";

type Istate = {
  state: { receiver?: string };
  pathname: string;
};
const ConversationsList = () => {
  const [welcome, setWelcome] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeConv, setActiveConv] = useState<string>("");
  const [firstConv, setFirstConv] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation() as Istate;
  const lg = useMedia(mediaQueries.lg);
  const [conversations, SetConversations] = useState([] as Conversation[]);
  const axiosPrivate = useAxiosPrivate();

  // get conversations
  useEffect(() => {
    const abortController = new AbortController();
    const GetConversations = async () => {
      try {
        const res = await axiosPrivate.get<Conversation[]>("/friends/rooms", {
          signal: abortController.signal,
        });
        console.log(res.data);
        SetConversations(
          res.data.filter(
            (c) =>
              (c.messages as any) /** messagesCount */ > 0 ||
              c.type != "private"
          )
        );
        setLoading(false);
      } catch (error) {
        setError("something went wrong! please refresh");
        setLoading(false);
      }
    };

    GetConversations();
    return () => {
      abortController.abort();
    };
  }, []);
  //  make the last avtive room at the top of the list
  const listener = (data: Message) => {
    console.log("room", data.room);
    setFirstConv(data.room || "");
  };
  useEffect(() => {
    if (!loading) {
      usersSocket.on("msgToClient", listener);
    }
    return () => {
      usersSocket.off("msgToClient", listener);
    };
  }, [loading]);

  useEffect(() => {
    if (firstConv) {
      console.log(conversations);
      const rIndex = conversations.findIndex((conv) => {
        console.log("ciidd", conv.cid);
        return conv.cid === firstConv;
      });
      console.log("index", rIndex);
      if (rIndex == -1 || rIndex == 0) return;
      const fRoom = conversations.splice(rIndex, 1)[0];
      fRoom.news = true;
      console.log("convs", conversations, fRoom);
      SetConversations([fRoom, ...conversations]);
    }
  }, [firstConv]);

  // send message
  useEffect(() => {
    if (!loading) {
      const receiver = location?.state?.receiver;
      if (receiver) {
        console.log("---->");
        usersSocket.emit("createPrivateRoom", { receiver });
        usersSocket.on("privateRoomCreated", (room: Conversation) => {
          console.log("---->1", room);
          console.log(room);
          const exRoom = conversations.find((c) => c.cid == room.cid);
          if (!exRoom) {
            console.log("convs", room);

            SetConversations((prev) => [{ ...room, name: "noname" }, ...prev]);
          }
          navigate(room.cid);
        });
      }
    }
    return () => {
      usersSocket.removeAllListeners("privateRoomCreated");
    };
  }, [loading]);

  useEffect(() => {
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
          {conversations.map((conv) => {
            usersSocket.emit("joinRoomToServer", conv.cid);
            return (
              <CoversationCard
                key={conv.cid}
                conversation={conv}
                activeConversation={{ activeConv, setActiveConv }}
              />
            );
          })}
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
      <Outlet context={{ setFirstConv, setActiveConv }} />
    </>
  );
};

export default ConversationsList;
