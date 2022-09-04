import { Route, Routes } from "react-router-dom";
import ConversationsList from "./components/Conversations";
import ChatMessages from "./components/Chat";
import SetErrorPage from "components/ErrorPage";

const Messages = () => {
  return (
    <>
      <div className="m-auto w-full h-full flex flex-col gap-4">
        <div className="py-4 flex flex-col lg:flex-row gap-4 h-full relative">
          <Routes>
            <Route path="" element={<ConversationsList />}>
              <Route path=":coversationID" element={<ChatMessages />} />
            </Route>
            <Route path="*" element={<SetErrorPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Messages;
