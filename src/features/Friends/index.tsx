import { Route, Routes } from "react-router-dom";
import FriendsList from "./components/Friends";
import FriendRequests from "./components/FriendRequests";
import TabBar from "components/TabBar";

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

export default function Friends() {
  return (
    <div className="w-full h-full flex flex-col gap-4 pt-4">
      <TabBar links={links} />
      <Routes>
        <Route index element={<FriendsList />} />
        <Route path="requests" element={<FriendRequests />} />
      </Routes>
    </div>
  );
}
