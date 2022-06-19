import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import BackImg from "/src/assets/images/Dashboard.jpg";
import Sidebar from "./Sidebar"
import Header from "./Header/";
import Loading from "/src/Components/Loading";

const Section = lazy(() => import("./Section"));


const Dashboard = () => {
  return (
    <div
      className="page backGround-img"
      style={{ backgroundImage: `url(${BackImg})` }}
    >
      <div className="page bg-gradient-to-t from-spaceCadet to-spaceCadet/50">
        <div className="container dash-layout">
          <Sidebar />
          <Header />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route index element={<Section page="home" />} />
              <Route path="leaderboard" element={<Section page="leaderboard" />} />
              <Route path="friends/*" element={<Section page="friends" />} />
              <Route path="messages" element={<Section page="messages" />} />
              <Route path="rooms" element={<Section page="rooms" />} />
              <Route path="profile" element={<Section page="profile" />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div >
  );
};

export default Dashboard;
