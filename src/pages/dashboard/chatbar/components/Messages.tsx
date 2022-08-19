import React, { useEffect, useRef, FunctionComponent } from "react";
import { Link } from "react-router-dom";
// import TimeAgo from "javascript-time-ago";
import { uid } from "uid";
import useAuth from "hooks/useAuth";

type Message = {
  username: string;
  text: string;
  date: Date;
  userId: string;
};

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

// 👇️ format as "MM-DD hh:mm:ss"
// You can tweak formatting easily
function formatDate(date: Date) {
  return (
    [padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join(
      "-"
    ) +
    " " +
    [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(":")
  );
}

const Messages: FunctionComponent<{ messages: Message[] }> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLHeadingElement>(null);
  const { user } = useAuth();

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  // }

  // useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollTo(0, 100000);
    console.log("cheking messages ", messages);
  }, [messages]);

  return (
    <div className="chat-messages" ref={messagesEndRef}>
      {messages &&
        messages.map((message) => (
          <Message
            key={uid()}
            message={message}
            own={message.userId == user.uid}
          />
        ))}
    </div>
  );
};

const Message: FunctionComponent<{ message: Message; own: boolean }> = ({
  message,
  own
}) => {
  return (
    <div className={own ? "message-wrapper own" : "message-wrapper"}>
      <Link to={`/profile/${message.username}`}>{message.username}</Link>
      <p>{message.text}</p>
      <span>{formatDate(new Date(message.date))}</span>
    </div>
  );
};

export default Messages;
