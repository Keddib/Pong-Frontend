import BackArrow from "assets/icons/back-arrow.svg";
import RightArrow from "assets/icons/right-arrow.svg";
import Ellipsis from "assets/icons/ellipsis.svg";
import { useEffect, useState } from "react";
import {
  Navigate,
  NavLink,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import MessageInput from "components/Messages/MessageInput";
import Messages from "components/Messages/Messages";
import { Message, Conversation } from "types/app";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Spinner } from "components/Loading";
import RoomCard from "components/RoomCard";
import { usersSocket } from "~/src/services/socket";
import useAuth from "hooks/useAuth";
import { mediaQueries } from "src/config";
import useMedia from "hooks/useMedia";
import RoomInfo from "./RoomInfo";
import SetErrorPage from "components/Error";

const ChatMessages = () => {
  const { conversationID } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [conv, setConv] = useState({} as Conversation);
  const [messages, setMessages] = useState([] as Message[]);
  const [msgFromsrv, setmsgFromsrv] = useState({} as Message);
  const [inputMessage, setInputMessage] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [roomInfo, setRoomInfo] = useState(false);
  const [mute, setMuted] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { setActiveConv, setFirstConv } = useOutletContext<any>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const lg = useMedia(mediaQueries.lg);

  useEffect(() => {
    // get conversation
    if (lg) {
      setActiveConv(conversationID || "");
    }
    async function getConversation() {
      try {
        const res = await axiosPrivate.get<Conversation>(
          `chat/${conversationID}`
        );

        setConv(res.data);
        setMessages(res.data.messages);
        setMuted((res.data as any).mutedUntil > Date.now());
        console.log("conv ===>", res.data);
      } catch (error) {
        setError(true);
      }
    }
    setLoading(true);
    getConversation().then(() => {
      setLoading(false);
    });
  }, [conversationID]);

  useEffect(() => {
    if (lg) {
      setActiveConv(conversationID || "");
    }
    let timeOut: NodeJS.Timeout;
    async function getConversation() {
      try {
        const res = await axiosPrivate.get<Conversation>(
          `chat/${conversationID}`
        );
        setConv(res.data);
        setMessages(res.data.messages);
        const until = (res.data as any).mutedUntil;
        console.log(until);
        if (until > Date.now()) {
          console.log("mutted", until - Date.now());
          setMuted(true);
          timeOut = setTimeout(() => {
            console.log("time callback");
            setMuted(false);
          }, until - Date.now());
        } else {
          setMuted(false);
        }
        console.log("conv ===>", res.data);
      } catch (error) {
        setError(true);
      }
    }
    getConversation();
    return () => {
      console.log("cleaaner");
      clearTimeout(timeOut);
    };
  }, [refresh, conversationID]);
  const refreshRequestHandler = (data: {
    type: string;
    room: string;
    removedUser?: string;
  }) => {
    console.log("chat refresh request", data);

    if (
      (conversationID == data.room &&
        data.type == "remove" &&
        data.removedUser == user.uid) ||
      data.removedUser == "*"
    )
      navigate("/messages", { replace: true });
    else if (conversationID == data.room) setRefresh((prev) => !prev);
  };

  useEffect(() => {
    if (!loading) {
      usersSocket.on("chatRefreshRequest", refreshRequestHandler);
      usersSocket.emit("listeningForEvents");
    }
    return () => {
      usersSocket.off("chatRefreshRequest", refreshRequestHandler);
    };
  }, [loading]);

  useEffect(() => {
    usersSocket.emit("joinRoomToServer", conversationID);
    const hundleMessage = (msg: Message) => {
      if (msg.room != conversationID) return;
      let newMessage: Message = {
        ownerId: msg["ownerId"],
        username: msg["username"],
        text: msg["text"],
        date: new Date(),
      };
      if (user.uid !== msg["ownerId"]) {
        // setmsgFromsrv(newMessage);
        setmsgFromsrv(newMessage);
      }
    };
    usersSocket.on("msgToClient", hundleMessage);

    return () => {
      usersSocket.off("msgToClient", hundleMessage);
    };
    // get messages
  }, [conversationID]);

  useEffect(() => {
    if (!msgFromsrv.text) return;
    setMessages([...messages, msgFromsrv]);
  }, [msgFromsrv]);

  useEffect(() => {
    if (inputMessage) {
      usersSocket.emit("msgToServer", {
        room: conv.cid,
        message: inputMessage,
      });
      const newMsg = {
        username: user.username,
        text: inputMessage,
        date: new Date(),
        ownerId: user.uid,
      };
      setMessages([...messages, newMsg]);
      setFirstConv({ room: conv.cid, new: false });
      setInputMessage("");
    }
  }, [inputMessage]);

  if (error) {
    return <SetErrorPage />;
  }

  return (
    <div
      className={`h-full grow rounded-3xl bg-queenBlue p-2 overflow-hidden flex flex-col gap-1 ${
        !lg && "absolute w-full top-0 left-0"
      } `}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="w-full flex justify-between items-center px-1  ">
            {!lg && (
              <NavLink to="/messages" end>
                <button className="flex justify-center items-center p-2 bg-queenBlue/20 rounded-full group hover:bg-queenBlue">
                  <BackArrow className="w-6 h-6 fill-lotion/50 group-hover:fill-lotion" />
                </button>
              </NavLink>
            )}
            <RoomCard room={conv} />
            {roomInfo ? (
              <button
                className="flex justify-center items-center p-2 bg-spaceCadet/50 rounded-full group hover:bg-spaceCadet w-fit"
                onClick={() => {
                  setRoomInfo(false);
                }}
              >
                <RightArrow className="w-6 h-6 fill-lotion/50 group-hover:fill-lotion" />
              </button>
            ) : (
              <button
                className="flex justify-center items-center p-2 bg-spaceCadet/50 rounded-full group hover:bg-spaceCadet w-fit"
                onClick={() => {
                  if (!loading) {
                    setRoomInfo(true);
                  }
                }}
              >
                <Ellipsis className="w-6 h-6 fill-lotion/50 group-hover:fill-lotion" />
              </button>
            )}
          </div>
          {roomInfo ? (
            <RoomInfo conv={conv} setRefresh={setRefresh} />
          ) : (
            <>
              <Messages messages={messages} />
              {/* mute must be true if the user is muted at this room  */}
              <MessageInput setMsg={setInputMessage} mute={mute} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ChatMessages;
