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
import More from "./More";

const ChatMessages = () => {
  const { coversationID } = useParams();
  const [loading, setLoading] = useState(true);
  const [conv, setConv] = useState({} as Conversation);
  const [messages, setMessages] = useState([] as Message[]);
  const [msgFromsrv, setmsgFromsrv] = useState({} as Message);
  const [inputMessage, setInputMessage] = useState("");
  const [more, setMore] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const lg = useMedia(mediaQueries.lg);

  useEffect(() => {
    // get conversation

    async function getConversationMessages() {
      try {
        const res = await axiosPrivate.get<Conversation>(
          `chat/${coversationID}`
        );
        console.log("cov", res.data);
        setConv(res.data);
        setMessages(res.data.messages);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        // setError()
      }
    }
    setLoading(true);
    getConversationMessages().then(() => {
      usersSocket.emit("joinRoomToServer", coversationID);
      console.log("init listener");
      usersSocket.on("msgToClient", (msg) => {
        if (msg.room != coversationID) return;
        let newMessage: Message = {
          userId: msg["userId"],
          username: msg["username"],
          text: msg["text"],
          date: new Date(),
        };
        console.log("received new msg from srv PIBLIC", newMessage, messages);
        console.log(" user id ", user.uid, " meg user id ", msg["userId"]);
        if (user.uid !== msg["userId"]) {
          console.log("received msg call stet ");
          setmsgFromsrv(newMessage);
        }
      });
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
        room: coversationID,
        message: inputMessage,
      });
      const newMsg = {
        username: user.username,
        text: inputMessage,
        date: new Date(),
        userId: user.uid,
      };
      setMessages([...messages, newMsg]);
      setInputMessage("");
    }
  }, [inputMessage]);

  return (
    <div className="h-full grow rounded-3xl bg-queenBlue/50 p-2 overflow-hidden flex flex-col gap-1">
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
            {more ? (
              <button
                className="flex justify-center items-center p-2 bg-queenBlue/20 rounded-full group hover:bg-queenBlue w-fit"
                onClick={() => {
                  setMore(false);
                }}
              >
                <RightArrow className="w-6 h-6 fill-lotion/50 group-hover:fill-lotion" />
              </button>
            ) : (
              <button
                className="group bell-button"
                onClick={() => {
                  setMore(true);
                }}
              >
                <Ellipsis className="iconBell" />
              </button>
            )}
          </div>
          {more ? (
            <More conv={conv} />
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
