import React, { useEffect, useRef, FunctionComponent } from "react";
import { Link } from "react-router-dom";
// import TimeAgo from "javascript-time-ago";
import { uid } from "uid";
import useAuth from "hooks/useAuth";

type Message = {
  sender: string;
  text: string;
  date: string;
};

const Messages: FunctionComponent<{ messages: Message[] }> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLHeadingElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("scrolled");
  }, []);

  return (
    <div className="chat-messages">
      {messages.map((message) => (
        <Message
          key={uid()}
          message={message}
          own={message.sender == user.username}
        />
      ))}
    </div>
  );
};

const Message: FunctionComponent<{ message: Message; own: boolean }> = ({
  message,
  own,
}) => {
  return (
    <div className={own ? "message-wrapper own" : "message-wrapper"}>
      <Link to={`/profile/${message.sender}`}>{message.sender}</Link>
      <p>{message.text}</p>
      <span>{message.date}</span>
    </div>
  );
};

export default Messages;
