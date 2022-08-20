// import { Link } from "react-router-dom";

import { FunctionComponent, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ConversationsList from "./components/ConversationsList";
import ChatMessages from "./components/Chat";

type Props = {
  setIsMessages: (b: boolean) => void;
};

const Messages: FunctionComponent<Props> = ({ setIsMessages }) => {
  useEffect(() => {
    setIsMessages(true);
    return () => setIsMessages(false);
  });

  return (
    <>
      <div className="m-auto w-full h-full flex flex-col gap-4">
        <div className="bg-queenBlue/50 rounded-2xl p-2 py-4  flex flex-col gap-4">
          <Routes>
            <Route path="" element={<ConversationsList />}>
              <Route path=":id" element={<ChatMessages />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Messages;
