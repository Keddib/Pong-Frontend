import { FunctionComponent } from "react";
import React, { useEffect, useRef } from "react";
import { User } from "types/app";

type Message = {
  user: User;
  data: string;
  time: string;
};

const Messages = () => {
  const messagesEndRef = useRef<HTMLHeadingElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("scrolled");
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="chat-messages flex flex-col gap-1">
      <div className="message-wrapper">
        <p className="message-sender">keddib</p>
        <p className="message-data">wash a drari haniyiiin</p>
        <p className="message-time">10:14 pm</p>
      </div>
      <div className="message-wrapper self-end">
        <p className="message-sender self-end">Malaoui</p>
        <p className="message-data bg-pictonBlue">wash a drari haniyiiin</p>
        <p className="message-time self-start">10:14 pm</p>
      </div>
      <div className="message-wrapper self-end">
        <p className="message-sender self-end">Malaoui</p>
        <p className="message-data bg-pictonBlue">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius quasi
          distinctio reiciendis nulla placeat assumenda quo quidem pariatur
          velit esse, expedita alias et? Quaerat, dicta sed facilis beatae
          tenetur eum!
        </p>
        <p className="message-time self-start">10:14 pm</p>
      </div>
      <div className="message-wrapper">
        <p className="message-sender">keddib</p>
        <p className="message-data">wash a drari haniyiiin</p>
        <p className="message-time">10:14 pm</p>
      </div>
      <div className="message-wrapper self-end">
        <p className="message-sender self-end">Malaoui</p>
        <p className="message-data bg-pictonBlue">wash a drari haniyiiin</p>
        <p className="message-time self-start">10:14 pm</p>
      </div>
      <div className="message-wrapper self-end">
        <p className="message-sender self-end">Malaoui</p>
        <p className="message-data bg-pictonBlue">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius quasi
          distinctio reiciendis nulla placeat assumenda quo quidem pariatur
          velit esse, expedita alias et? Quaerat, dicta sed facilis beatae
          tenetur eum!
        </p>
        <p className="message-time self-start">10:14 pm</p>
      </div>
      <div className="message-wrapper">
        <p className="message-sender">keddib</p>
        <p className="message-data">wash a drari haniyiiin</p>
        <p className="message-time">10:14 pm</p>
      </div>
      <div className="message-wrapper self-end">
        <p className="message-sender self-end">Malaoui</p>
        <p className="message-data bg-pictonBlue">wash a drari haniyiiin</p>
        <p className="message-time self-start">10:14 pm</p>
      </div>
      <div className="message-wrapper self-end">
        <p className="message-sender self-end">Malaoui</p>
        <p className="message-data bg-pictonBlue">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius quasi
          distinctio reiciendis nulla placeat assumenda quo quidem pariatur
          velit esse, expedita alias et? Quaerat, dicta sed facilis beatae
          tenetur eum!
        </p>
        <p className="message-time self-start">10:14 pm</p>
      </div>
      <div className="message-wrapper">
        <p className="message-sender">keddib</p>
        <p className="message-data">wash a drari haniyiiin</p>
        <p className="message-time">10:14 pm</p>
      </div>
      <div className="message-wrapper self-end">
        <p className="message-sender self-end">Malaoui</p>
        <p className="message-data bg-pictonBlue">wash a drari haniyiiin</p>
        <p className="message-time self-start">10:14 pm</p>
      </div>
      <div className="message-wrapper self-end">
        <p className="message-sender self-end">Malaoui</p>
        <p className="message-data bg-pictonBlue">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius quasi
          distinctio reiciendis nulla placeat assumenda quo quidem pariatur
          velit esse, expedita alias et? Quaerat, dicta sed facilis beatae
          tenetur eum!
        </p>
        <p className="message-time self-start">10:14 pm</p>
      </div>
      <div className="message-wrapper">
        <p className="message-sender">keddib</p>
        <p className="message-data">wash a drari haniyiiin</p>
        <p className="message-time">10:14 pm</p>
      </div>
      <div className="message-wrapper self-end">
        <p className="message-sender self-end">Malaoui</p>
        <p className="message-data bg-pictonBlue">wash a drari haniyiiin</p>
        <p className="message-time self-start">10:14 pm</p>
      </div>
      <div className="message-wrapper self-end">
        <p className="message-sender self-end">Malaoui</p>
        <p className="message-data bg-pictonBlue">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius quasi
          distinctio reiciendis nulla placeat assumenda quo quidem pariatur
          velit esse, expedita alias et? Quaerat, dicta sed facilis beatae
          tenetur eum!
        </p>
        <p className="message-time self-start">10:14 pm</p>
      </div>
      <div className="message-wrapper">
        <p className="message-sender">keddib</p>
        <p className="message-data">wash a drari haniyiiin</p>
        <p className="message-time">10:14 pm</p>
      </div>
      <div className="message-wrapper self-end">
        <p className="message-sender self-end">Malaoui</p>
        <p className="message-data bg-pictonBlue">wash a drari haniyiiin</p>
        <p className="message-time self-start">10:14 pm</p>
      </div>
      <div className="message-wrapper self-end">
        <p className="message-sender self-end">Malaoui</p>
        <p className="message-data bg-pictonBlue">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius quasi
          distinctio reiciendis nulla placeat assumenda quo quidem pariatur
          velit esse, expedita alias et? Quaerat, dicta sed facilis beatae
          tenetur eum!
        </p>
        <p className="message-time self-start">10:14 pm</p>
      </div>
      <div className="message-wrapper">
        <p className="message-sender">keddib</p>
        <p className="message-data">wash a drari haniyiiin</p>
        <p className="message-time">10:14 pm</p>
      </div>
      <div className="message-wrapper self-end">
        <p className="message-sender self-end">Malaoui</p>
        <p className="message-data bg-pictonBlue">wash a drari haniyiiin</p>
        <p className="message-time self-start">10:14 pm</p>
      </div>
      <div className="message-wrapper self-end">
        <p className="message-sender self-end">Malaoui</p>
        <p className="message-data bg-pictonBlue">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius quasi
          distinctio reiciendis nulla placeat assumenda quo quidem pariatur
          velit esse, expedita alias et? Quaerat, dicta sed facilis beatae
          tenetur eum!
        </p>
        <p className="message-time self-start">10:14 pm</p>
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
