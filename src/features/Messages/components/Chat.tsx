import { FunctionComponent, useEffect, useState } from "react";
import MessageInput from "components/Messages/MessageInput";
import Messages from "components/Messages/Messages";
import RoomCard from "~/src/components/RoomCard";
import { Message, Room } from "types/app";

const ChatMessages = () => {
  const [messages, setMessages] = useState([] as Message[]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (inputMessage) {
      const newMsg = {
        username: "ana",
        text: inputMessage,
        date: new Date(),
        userId: "kedf_7444",
      };
      setMessages((prev) => [...prev, newMsg]);
    }
  }, [inputMessage]);

  return (
    <div className="border chat-section">
      <div className="border w-full">
        <h4>Header</h4>
        {/* <RoomCard room={room} /> */}
      </div>
      <Messages messages={messages} />
      <MessageInput setMsg={setInputMessage} />
    </div>
  );
};

export default ChatMessages;
