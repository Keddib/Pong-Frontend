import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Spinner } from "components/Loading";
import { User } from "types/app";
import FriendListItem from "./FriendListItem";

const FriendList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [friends, setFriends] = useState([] as User[]);
  const axiosPrivate = useAxiosPrivate();

  // error should be checked

  // use effect to fetch friendlist
  useEffect(() => {
    // fetch freinds
    const abortController = new AbortController();
    async function getFriends() {
      try {
        // fetch user data
        const res = await axiosPrivate.get<User[]>("/friends/all", {
          signal: abortController.signal,
        });
        // check payload
        setFriends(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("something went wrong! please try again");
      }
    }
    getFriends();
    return () => {
      abortController.abort();
    };
  }, []);

  const friendsArray = friends.map((friend) => (
    <li key={friend.uid}>
      <FriendListItem user={friend} />
    </li>
  ));

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <ul className="flex flex-col gap-1 h-full overflow-auto no-scrollbar">
          {friendsArray.length ? (
            <>{friendsArray}</>
          ) : (
            <div className="w-full h-full flex justify-center items-center flex-col gap-4">
              {error ? (
                <p>{error}</p>
              ) : (
                <>
                  <p>search for friens</p>
                  <Link to="/rooms/players">serach page</Link>
                </>
              )}
            </div>
          )}
        </ul>
      )}
    </>
  );
};

export default FriendList;
