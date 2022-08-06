import { useState, useEffect } from "react";
import { Spinner } from "components/Loading";
import { User } from "types/app";
import FriendList from "./FriendList";

export default function Friends() {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([] as User[]);

  useEffect(() => {
    // fetch freinds
    const TO = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(TO);
  }, []);

  return (
    <ul className="flex flex-col gap-1 h-full overflow-auto no-scrollbar">
      {loading ? <Spinner /> : <FriendList friends={friends} />}
    </ul>
  );
}
