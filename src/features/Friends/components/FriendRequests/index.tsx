import { useState, useEffect } from "react";
import { Spinner } from "components/Loading";
import { User } from "types/app";
import RequestList from "./RequestList";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import axios from "axios";

export default function FriendRequests() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [requests, setRequests] = useState([] as User[]);
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
        setRequests(res.data);
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
      {loading ? <RequestList requests={requests} /> : <Spinner />}
    </ul>
  );
}
