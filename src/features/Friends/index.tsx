import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import FriendsList from "./components/Friends";
import FriendRequests from "./components/FriendRequests";
import TabBar from "components/TabBar";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { User } from "types/app";
import { Spinner } from "~/src/components/Loading";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [friends, setFriends] = useState([] as User[]);
  const [friendRequests, setFriendRequests] = useState([] as User[]);
  const axiosPrivate = useAxiosPrivate();

  // error should be checked

  // use effect to fetch friendlist
  useEffect(() => {
    // fetch freinds
    const abortController = new AbortController();
    async function getFriends() {
      try {
        // fetch user data
        const res = await axiosPrivate.get<User[]>("/friendsList", {
          signal: abortController.signal,
        });
        // check payload
        console.log("user", res.data);
        setFriends(res.data);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("axios error ", error.response?.status);
          // if forbiden check user state and sign in
        } else {
          console.log(error);
        }
        setLoading(false);
        setError("somting went wrong! please try again");
      }
      // setErrorStatusCode(400);
    }
    getFriends();
    return () => {
      abortController.abort();
    };
  }, []);

  // use effect to fetch friendlist
  useEffect(() => {
    // fetch freinds
    const abortController = new AbortController();
    async function getFriendRequests() {
      try {
        // fetch user data
        const res = await axiosPrivate.get<User[]>("/friendRequests", {
          signal: abortController.signal,
        });
        // check payload
        console.log("user", res.data);
        setFriendRequests(res.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("axios error ", error.response?.status);
          // if forbiden check user state and sign in
        } else {
          console.log(error);
        }
        setError("somting went wrong! please try again");
      }
      // setErrorStatusCode(400);
    }
    getFriendRequests();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-4 pt-4">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <TabBar links={links} />
          <Routes>
            <Route index element={<FriendsList friends={friends} />} />
            <Route
              path="requests"
              element={<FriendRequests requests={friendRequests} />}
            />
          </Routes>
        </>
      )}
    </div>
  );
}
