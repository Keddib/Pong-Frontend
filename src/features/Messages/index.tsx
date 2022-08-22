import { FunctionComponent, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ConversationsList from "./components/ConversationsList";
import ChatMessages from "./components/Chat";
import useMedia from "hooks/useMedia";
import { mediaQueries } from "config/index";

type Props = {
  setIsMessages: (b: boolean) => void;
};

const Messages: FunctionComponent<Props> = ({ setIsMessages }) => {
  const lg = useMedia(mediaQueries.lg);

  useEffect(() => {
    setIsMessages(true);
    return () => setIsMessages(false);
  });

  return (
    <>
      <div className="m-auto w-full h-full flex flex-col gap-4">
        <div className="py-4 flex flex-col lg:flex-row gap-4 h-full">
          <Routes>
            {lg ? (
              <Route path="" element={<ConversationsList />}>
                <Route path=":id" element={<ChatMessages />} />
              </Route>
            ) : (
              <>
                <Route path="" element={<ConversationsList />} />
                <Route path=":id" element={<ChatMessages />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Messages;
