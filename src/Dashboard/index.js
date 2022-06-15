import { Outlet } from "react-router-dom";
import NavBar from "./Navbar/Navbar";
import BackImg from "../../public/assets/images/Dashboard.jpg";
import Header from "./Header/Header";
import User from "../../public/assets/images/signin.png";
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
          {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
        the child routes we defined above. */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
