import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useParams } from "react-router-dom";
import {} from "react-router-dom";
import TabBar from "components/TabBar";
import ProfileHeader from "./components/Profileheader";
import OverView from "./components/Overview";
import MatchHistory from "./components/Matchhistory";
import EditProfile from "./components/Updateprofile";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { User } from "types/app";
import useAuth from "hooks/useAuth";
import axios from "axios";

const links = {
  first: {
    name: "Overview",
    path: "/profile",
  },
  second: {
    name: "Match History",
    path: "match-history",
  },
};

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({} as User);
  const { getAccessToken } = useAuth();
  const { username } = useParams();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const abortController = new AbortController();
    console.log("profile of", username);
    async function getUserData() {
      try {
        // fetch user data
        const res = await axiosPrivate.get<User>(`users/${username}`, {
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
          signal: abortController.signal,
        });
        // check if payload is user
        console.log("user", res.data);
        setUser(res.data);
        setIsLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("axios error ", error.status);
          // if forbiden check user state and sign in
        } else {
          console.log(error);
        }
      }
    }
    getUserData();
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <>
      {!isLoading && (
        <div className="m-auto w-full h-full flex flex-col gap-4">
          <ProfileHeader user={user} />
          <div className="bg-queenBlue/50 rounded-2xl md:p-2 py-4  flex flex-col gap-4">
            <TabBar links={links} />
            <Routes>
              <Route index element={<OverView user={user} />} />
              <Route
                path="match-history"
                element={<MatchHistory username={user.username} />}
              />
              {user.rules == "me" && (
                <Route path="edit" element={<EditProfile />} />
              )}
              <Route path="*" element={<Navigate to="error" />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
