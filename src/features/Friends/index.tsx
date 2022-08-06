import { Route, Routes } from "react-router-dom";
import Friends from "./components/Friends";
import FriendRequests from "./components/FriendRequests";
import TabBar from "components/TabBar";

export default function Friends() {
  const links = {
    first: {
      name: "Friends",
      path: "",
    },
    second: {
      name: "Requests",
      path: "requests",
    },
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 pt-4">
      <TabBar links={links} />
      <Routes>
        <Route index element={<Friends />} />
        <Route path="requests" element={<FriendRequests />} />
      </Routes>
    </div>
  );
}
