import { useEffect, useState } from "react";
import { FriendRequest } from "types/app";
import useAxiosPrivate from "~/src/hooks/useAxiosPrivate";
import axios from "axios";
import { Spinner } from "~/src/components/Loading";
import RequestListItem from "./RequestItem";

const RequestList = () => {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([] as FriendRequest[]);
  const axiosPrivate = useAxiosPrivate();

  function removeReq(rUid: string) {
    const reqs = requests.filter((req) => req.uid != rUid);
    setRequests(reqs);
  }

  // use effect to fetch friendlist
  useEffect(() => {
    // fetch freinds
    const abortController = new AbortController();
    async function getFriendRequests() {
      try {
        // fetch user data
        const res = await axiosPrivate.get<FriendRequest[]>(
          "/friends/requests",
          {
            signal: abortController.signal,
          }
        );
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
      }
      // setErrorStatusCode(400);
      setLoading(false);
    }
    getFriendRequests();
    return () => {
      abortController.abort();
    };
  }, []);

  const requestsArray = requests.map((request) => (
    <li key={request.uid}>
      <RequestListItem
        user={request.sender}
        ReqUid={request.uid}
        removeReq={removeReq}
      />
    </li>
  ));

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <ul className="flex flex-col gap-1 h-full overflow-auto no-scrollbar">
          {requestsArray.length ? (
            <>{requestsArray}</>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <p>no friend requests</p>
            </div>
          )}
        </ul>
      )}
    </>
  );
};

export default RequestList;
