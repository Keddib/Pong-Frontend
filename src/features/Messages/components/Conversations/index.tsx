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
  state: { receiver?: string; refresh: boolean };
  pathname: string;
};

const ConversationsList = () => {
  const [welcome, setWelcome] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeConv, setActiveConv] = useState<string>("");
  const [firstConv, setFirstConv] = useState({ room: "", new: false });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation() as Istate;
  const lg = useMedia(mediaQueries.lg);
  const [conversations, SetConversations] = useState([] as Conversation[]);
  const axiosPrivate = useAxiosPrivate();

  const [updatedRoom, setUpdatedRoom] = useState("");

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
          res.data.filter((c) => {
            if (c.cid == updatedRoom) {
              c.news = true;
            }
            return (
              (c.messages as any) /** messagesCount */ > 0 ||
              c.type != "private"
            );
          })
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
  }, [updatedRoom]);
  //  make the last avtive room at the top of the list
  const listener = (data: Message) => {
    console.log("room", data.room);
    setFirstConv({ room: data.room || "", new: true });
  };

  useEffect(() => {
    if (!loading) {
      usersSocket.on("msgToClient", listener);
      usersSocket.emit("listeningForNewMessage");
    }
    return () => {
      usersSocket.off("msgToClient", listener);
    };
  }, [loading]);

  useEffect(() => {
    if (firstConv.room) {
      console.log(conversations);
      const rIndex = conversations.findIndex((conv) => {
        console.log("ciidd", conv.cid);
        return conv.cid === firstConv.room;
      });
      console.log("index", rIndex);
      if (rIndex == -1) return;
      else if (rIndex == 0) {
        const fRoom = conversations[0];
        if (firstConv.new && firstConv.room != activeConv) fRoom.news = true;
        return;
      }
      const fRoom = conversations.splice(rIndex, 1)[0];
      if (firstConv.new && firstConv.room != activeConv) fRoom.news = true;
      // only if user isnt the message sender + remove when seen
      console.log("convs", conversations, fRoom);
      SetConversations([fRoom, ...conversations]);
    }
  }, [firstConv]);

  // private room and new message notif
  useEffect(() => {
    if (!loading) {
      // calling private room with user :location?.state?.receiver
      const receiver = location?.state?.receiver;
      if (receiver) {
        console.log("---->receiver");
        usersSocket.emit("createPrivateRoom", { receiver });
        usersSocket.on("privateRoomCreated", (room: Conversation) => {
          console.log("---->1", room);
          console.log(room);
          const exRoom = conversations.find((c) => c.cid == room.cid);
          if (!exRoom) {
            console.log("convs", room);

            SetConversations((prev) => [
              { ...room, name: "nonahgffghgfme" },
              ...prev,
            ]);
          }
          navigate(room.cid);
        });
      }

      // listening for new message
      usersSocket.on("newMessage", (data: { sender: string; room: string }) => {
        console.log("----> wwwa", data.room);
        console.log(data.room);
        const updatedRoom = conversations.find((c) => c.cid == data.room);
        console.log("");
        if (updatedRoom) {
          console.log("should notify");
          setFirstConv({ room: updatedRoom.cid, new: true });

          // add red dot on conv
        } else {
          console.log("should refresh");
          setUpdatedRoom(data.room);
        }
      });
    }
    return () => {
      usersSocket.removeAllListeners("privateRoomCreated");
      usersSocket.removeAllListeners("newMessage");
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
    console.log("state of location", location.state);
    if (location?.state?.refresh) {
      setUpdatedRoom("....");
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
