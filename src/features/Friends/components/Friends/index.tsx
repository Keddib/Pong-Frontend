import { useState, useEffect } from "react";
import { Spinner } from "components/Loading";
import { User } from "types/app";
import axios from "axios";
import FriendList from "./FriendList";
import useAxiosPrivate from "~/src/hooks/useAxiosPrivate";

export default function Friends() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [friends, setFriends] = useState([] as User[]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    // fetch freinds
    const abortController = new AbortController();
    async function getFriends() {
      try {
        // fetch user data
        const res = await axiosPrivate.get<User[]>(``, {
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

  return (
    <ul className="flex flex-col gap-1 h-full overflow-auto no-scrollbar">
      {loading ? <Spinner /> : <FriendList friends={friends} />}
    </ul>
  );
}
