import { Route, Routes } from "react-router-dom";
import ConversationsList from "./components/Conversations";
import ChatMessages from "./components/Chat";
import SetErrorPage from "components/Error";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

const Messages = () => {
  const setTitle = useTitle();

  useEffect(() => {
    setTitle("Messages");
  }, []);
  return (
    <>
      <div className="m-auto w-full h-full flex flex-col gap-4">
        <div className="py-4 flex flex-col lg:flex-row gap-4 h-full relative">
          <Routes>
            <Route path="" element={<ConversationsList />}>
              <Route path=":conversationID" element={<ChatMessages />} />
            </Route>
            <Route path="*" element={<SetErrorPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Messages;
