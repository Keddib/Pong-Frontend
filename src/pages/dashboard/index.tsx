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
import UserStatusProvider from "./components/UserStatusProvider";
import useTitle from "~/src/hooks/useTitle";

const Dashboard = () => {
  const [gameRoomId, setGameRoomId] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { updateUser, signout } = useAuth();
  const navigate = useNavigate();

  const setTitle = useTitle();

  useEffect(() => {
    setTitle("Home");
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    async function getUserData() {
      try {
        const res = await axiosPrivate.get<User>("/user", {
          signal: abortController.signal,
        });
        updateUser(res.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status == 401) {
            signout();
          }
        }
        navigate("/access/login", { replace: true });
      }
    }
    getUserData();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <main
      className="page backGround-img"
      style={{ backgroundImage: `url(${BackImg})` }}
    >
      <div className="page bg-gradient-to-t from-spaceCadet to-spaceCadet/70">
        <div className="dash-layout">
          <UserStatusProvider>
            <Sidebar />
            <Header />
            <Main setGameRoomId={setGameRoomId} />
            <ChatBar gameRoomId={gameRoomId} />
          </UserStatusProvider>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
