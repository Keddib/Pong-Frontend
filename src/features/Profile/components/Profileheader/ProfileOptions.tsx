import { FunctionComponent, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "~/src/hooks/useAuth";
import useAxiosPrivate from "~/src/hooks/useAxiosPrivate";
const ProfileOptions: FunctionComponent<{
  rules: "me" | "friend" | "requested" | "none";
  uid: string;
}> = ({ rules, uid }) => {
  if (rules == "me") {
    return (
      <NavLink
        to="edit"
        className="button--3 px-4 text-sm md:px-8 md:text-xl"
        end
      >
        edit profile
      </NavLink>
    );
  } else if (rules == "friend") {
    return (
      <button className="button--3 px-4 text-sm md:px-8 md:text-xl">
        friend
      </button>
    );
  } else if (rules == "requested") {
    return <h1>request sent</h1>;
  }
  return <AddFriend uid={uid} />;
};

export default ProfileOptions;

const AddFriend: FunctionComponent<{ uid: string }> = ({ uid }) => {
  const [isDone, setDone] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  function handleAddFriend() {
    async function addFriend() {
      const res = axiosPrivate.post("/friends/add", {
        receiver: uid,
        sender: user.uid,
      });
    }

    try {
      addFriend().then(() => {
        setDone(true);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button
      className="button--3 px-4 text-sm md:px-8 md:text-xl"
      onClick={handleAddFriend}
    >
      {isDone ? "added" : "add friend"}
    </button>
  );
};
