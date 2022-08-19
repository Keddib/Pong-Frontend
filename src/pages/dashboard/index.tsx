import BackImg from "assets/images/Dashboard.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "types/app";
import Sidebar from "./sidebar";
import Header from "./header";
import ChatBar from "./chatbar";
import Main from "./main";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import useAuth from "hooks/useAuth";

const Dashboard = () => {
  const [chatBar, setChatBar] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const { updateUser, signout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    async function getUserData() {
      try {
        const res = await axiosPrivate.get<User>("/user");
        console.log("authenticated user../ ", res.data);
        updateUser(res.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status == 401) {
            // signout();
          }
        }
        // navigate("/access/login", { replace: true });
      }
    }
    getUserData();
  }, []);

  return (
    <main
      className="page backGround-img"
      style={{ backgroundImage: `url(${BackImg})` }}
    >
      <div className="page bg-gradient-to-t from-spaceCadet to-spaceCadet/70">
        <div className="dash-layout">
          <Sidebar />
          <Header />
          <Main setChatBar={setChatBar} />
          {chatBar && <ChatBar />}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
