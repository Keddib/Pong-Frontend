import BackArrow from "assets/icons/back-arrow.svg";
import RightArrow from "assets/icons/right-arrow.svg";
import Ellipsis from "assets/icons/ellipsis.svg";

import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import MessageInput from "components/Messages/MessageInput";
import Messages from "components/Messages/Messages";
import { Message, Conversation } from "types/app";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Spinner } from "components/Loading";
import RoomCard from "components/RoomCard";
import { usersSocket } from "services/axios/socket";
import useAuth from "hooks/useAuth";
import { mediaQueries } from "src/config";
import useMedia from "hooks/useMedia";
import RoomInfo from "./RoomInfo";
import SetErrorPage from "components/ErrorPage";
import Conversation from "./Conversation";

const ChatMessages = () => {
  const { coversationID } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [conv, setConv] = useState({} as Conversation);
  const [messages, setMessages] = useState([] as Message[]);
  const [msgFromsrv, setmsgFromsrv] = useState({} as Message);
  const [inputMessage, setInputMessage] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [roomInfo, setRoomInfo] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const lg = useMedia(mediaQueries.lg);

  useEffect(() => {
    // get conversation
    async function getConversation() {
      try {
        const res = await axiosPrivate.get<Conversation>(
          `chat/${coversationID}`
        );
        res.data.admins.push(res.data.owner);
        setConv(res.data);
        setMessages(res.data.messages);
        console.log(res.data);
        // if not in convs set error
      } catch (error) {
        setError(true);
      }
    }
    setLoading(true);
    getConversation();
    setLoading(false);
  }, [refresh, axiosPrivate, coversationID]);

  useEffect(() => {
    // get messages

    async function getConversationMessages() {
      // try {
      //   const res = await axiosPrivate.get<Conversation>(
      //     `chat/${coversationID}`
      //   );
      //   setConv(res.data);
      //   // setMessages(res.data.messages);
      //   // get messages
      //   setLoading(false);
      // } catch (error) {
      //   setError(true);
      //   setLoading(false);
      //   // setError()
      // }
      // get messages
    }
    // setLoading(true);

    usersSocket.emit("joinRoomToServer", coversationID);
    usersSocket.on("msgToClient", (msg) => {
      if (msg.room != coversationID) return;
      let newMessage: Message = {
        ownerId: msg["ownerId"],
        username: msg["username"],
        text: msg["text"],
        date: new Date()
      };
      if (user.uid !== msg["ownerId"]) {
        setmsgFromsrv(newMessage);
      }
    });
    // get messages
  }, [coversationID]);

  useEffect(() => {
    if (!msgFromsrv.text) return;
    setMessages([...messages, msgFromsrv]);
  }, [msgFromsrv]);

  useEffect(() => {
    if (inputMessage) {
      usersSocket.emit("msgToServer", {
        room: conv.cid,

        
        message: inputMessage
      });
      const newMsg = {
        username: user.username,
        text: inputMessage,
        date: new Date(),
        ownerId: user.uid
      };
      setMessages([...messages, newMsg]);
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
              <MessageInput setMsg={setInputMessage} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ChatMessages;
