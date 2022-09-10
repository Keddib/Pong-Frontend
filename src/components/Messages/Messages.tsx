import { useEffect, useRef, FunctionComponent } from "react";
import { format } from "timeago.js";
import { uid } from "uid";
import useAuth from "hooks/useAuth";
import { Message } from "types/app";
import { NavLink } from "react-router-dom";

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
  own,
}) => {
  return (
    <li className={own ? "message-wrapper own" : "message-wrapper"}>
      <NavLink to={`/profile/${message.username}`} className="relative">
        {message.username}
      </NavLink>
      <p className="normal-case">{message.text}</p>
      <span>{format(new Date(message.date))}</span>
    </li>
  );
};

export default Messages;
