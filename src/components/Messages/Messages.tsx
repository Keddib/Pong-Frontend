import Xmark from "assets/icons/xmark.svg";
import { useEffect, useRef, FunctionComponent, useState } from "react";
import { format } from "timeago.js";
import { uid } from "uid";
import useAuth from "hooks/useAuth";
import { Message } from "types/app";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import Dropdown from "../Dropdown";

const Messages: FunctionComponent<{ messages: Message[] }> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLHeadingElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ul className="chat-messages bg-spaceCadet rounded-3xl">
      {messages &&
        messages.map((message) => (
          <Message
            key={uid()}
            message={message}
            own={message.ownerId == user.uid}
          />
        ))}
      <div ref={messagesEndRef}></div>
    </ul>
  );
};

const Message: FunctionComponent<{ message: Message; own: boolean }> = ({
  message,
  own
}) => {
  const [show, setShow] = useState(false);

  function showDropDown() {
    setShow(!show);
  }

  return (
    <li className={own ? "message-wrapper own" : "message-wrapper"}>
      <button className="relative" onClick={showDropDown}>
        {message.username}
      </button>
      <p className="normal-case">{message.text}</p>
      <span>{format(new Date(message.date))}</span>
    </li>
  );
};

export default Messages;
