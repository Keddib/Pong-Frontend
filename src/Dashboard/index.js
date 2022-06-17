import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import BackImg from "../../public/assets/images/Dashboard.jpg";
import Loading from "../Components/Loading";
import NavBar from "./Navbar/Navbar";
import Header from "./Header/Header";
import User from "../../public/assets/images/signin.png";
// const Home = lazy(() => import("./Dashboard/MainPage/Home"));
const LeaderBoard = lazy(() => import("./MainPage/LeaderBoard"));
const Messages = lazy(() => import("./MainPage/Messages"));
const Friends = lazy(() => import("./MainPage/Friends"));
const FriendList = lazy(() => import("./MainPage/Friends/List/FriendList"));
const FriendReq = lazy(() =>
  import("./MainPage/Friends/Requests/FriendRequets")
);
const Groups = lazy(() => import("./MainPage/Groups"));
const Profile = lazy(() => import("./MainPage/Profile"));
const Home = lazy(() => import("./MainPage/Home"));
// import Loading from "../Components/Loading"

var user1 = {
  id: "123",
  img: User,
  name: "AlaeOX7",
  status: "Online",
  // dot: "red-dot"
};

const Dashboard = () => {
  return (
    <div
      className="page backGround-img"
      style={{ backgroundImage: `url(${BackImg})` }}
    >
      <div className="page bg-gradient-to-t from-spaceCadet to-spaceCadet/50">
        <div className="container dash-layout">
          <NavBar />
          <Header user={user1} />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/leaderboard" element={<LeaderBoard />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/friends" element={<Friends />}>
                <Route index element={<FriendList />} />
                <Route path="requests" element={<FriendReq />} />
              </Route>
              <Route path="/groups" element={<Groups />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
