import { useState, useEffect } from "react";
import { Spinner } from "components/Loading";
import { User } from "types/app";
import RequestList from "./RequestList";

export default function FriendRequests() {
  const [done, setDone] = useState(false);
  const [requests, setRequests] = useState([] as User[]);

  useEffect(() => {
    const TO = setTimeout(() => {
      setDone(true);
    }, 1000);

    return () => {
      clearTimeout(TO);
    };
  }, [requests]);

  return (
    <ul className="flex flex-col gap-1 h-full overflow-auto no-scrollbar">
      {done ? <RequestList requests={requests} /> : <Spinner />}
    </ul>
  );
}
