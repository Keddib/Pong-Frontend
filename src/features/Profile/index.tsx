import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useParams } from "react-router-dom";
import {} from "react-router-dom";
import TabBar from "components/TabBar";
import ProfileHeader from "./components/Profileheader";
import OverView from "./components/Overview";
import MatchHistory from "./components/Matchhistory";
import EditProfile from "./components/Updateprofile";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Game, User } from "types/app";
import useAuth from "hooks/useAuth";
import axios from "axios";
import useErrorStatus from "hooks/useErrorStatus";

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
  const [currentUser, setCurrentUser] = useState({} as User);
  const [games, setGames] = useState([] as Game[]);
  const { user } = useAuth();
  const { username } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { setErrorStatusCode } = useErrorStatus();

  useEffect(() => {
    const abortController = new AbortController();
    console.log("profile of", username);
    links.first.path = `/profile/${username}`;
    async function getUserGames(id: string) {
      try {
        const gameRes = await axiosPrivate.get(`game/history/${id}`, {
          signal: abortController.signal,
        });
        setGames(gameRes.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("axios error ", error.response?.status);
          // if forbiden check user state and sign in
        } else {
          console.log(error);
        }
      }
    }
    async function getUserData() {
      try {
        // fetch user data
        const res = await axiosPrivate.get<User>(`users/${username}`, {
          signal: abortController.signal,
        });
        // check if payload is user
        console.log("user", res.data);
        setCurrentUser(res.data);
        setIsLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("axios error ", error.response?.status);
          // if forbiden check user state and sign in
        } else {
          console.log(error);
        }
        setIsLoading(false);
      }
      setErrorStatusCode(400);
    }
    if (user.username !== username) {
      getUserData().then(() => {
        getUserGames(currentUser.uid);
      });
    } else {
      setCurrentUser({ ...user, rules: "me" });
      getUserGames(user.uid);
      setIsLoading(false);
    }

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <>
      {!isLoading && (
        <div className="m-auto w-full h-full flex flex-col gap-4">
          <ProfileHeader user={currentUser} />
          <div className="bg-queenBlue/50 rounded-2xl md:p-2 py-4  flex flex-col gap-4">
            <TabBar links={links} />
            <Routes>
              <Route
                index
                element={<OverView user={currentUser} game={games[0]} />}
              />
              <Route
                path="match-history"
                element={<MatchHistory games={games} />}
              />
              {currentUser.rules == "me" && (
                <Route path="edit" element={<EditProfile />} />
              )}
              <Route element={<ErrorPath />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
};

function ErrorPath() {
  const { setErrorStatusCode } = useErrorStatus();
  useEffect(() => {
    setErrorStatusCode(400);
  }, []);
  return <></>;
}

export default Profile;
