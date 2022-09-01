import { Route, Routes } from "react-router-dom";
import ConversationsList from "./components/ConversationsList";
import ChatMessages from "./components/Chat";
import { Conversation, Message } from "~/src/types/app";

const Messages = () => {
  return (
    <>
      <div className="m-auto w-full h-full flex flex-col gap-4">
        <div className="py-4 flex flex-col lg:flex-row gap-4 h-full relative">
          <Routes>
            <Route path="" element={<ConversationsList />}>
              <Route path=":coversationID" element={<ChatMessages />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Messages;
