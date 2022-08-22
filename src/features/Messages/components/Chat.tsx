import BackArrow from "assets/icons/back-arrow.svg";
import { FunctionComponent, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import MessageInput from "components/Messages/MessageInput";
import Messages from "components/Messages/Messages";
import RoomCard from "components/RoomCard";
import { Message, Room } from "types/app";
import Options from "./Options";

const ChatMessages = () => {
  const [messages, setMessages] = useState([] as Message[]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (inputMessage) {
      const newMsg = {
        username: "keddib",
        text: inputMessage,
        date: new Date(),
        userId: "kedf_7444",
      };
      setMessages([...messages, newMsg]);
    }
  }, [inputMessage]);

  return (
    <div className="chat-section h-full rounded-3xl bg-queenBlue/50 p-2">
      <div className="w-full flex justify-between items-center px-1">
        <NavLink to="/messages" end>
          <div className="flex justify-center items-center p-2 bg-queenBlue/20 rounded-full group hover:bg-queenBlue">
            <BackArrow className="w-6 h-6 fill-lotion/50 group-hover:fill-lotion" />
          </div>
        </NavLink>
        {/* <RoomCard /> */}
        <p>card</p>
        <Options />
      </div>
      <Messages messages={messages} />
      <MessageInput setMsg={setInputMessage} />
    </div>
  );
};

export default ChatMessages;
