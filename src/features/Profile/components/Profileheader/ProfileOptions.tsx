import { FunctionComponent, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "~/src/hooks/useAuth";
import useAxiosPrivate from "~/src/hooks/useAxiosPrivate";
const ProfileOptions: FunctionComponent<{
  rule: string;
  uid: string;
}> = ({ rule, uid }) => {
  if (rule == "me") {
    return (
      <NavLink
        to="edit"
        className="button--3 px-4 text-sm md:px-8 md:text-xl"
        end
      >
        edit profile
      </NavLink>
    );
  } else if (rule == "friends") {
    return (
      <button className="button--3 px-4 text-sm md:px-8 md:text-xl">
        friend
      </button>
    );
  } else if (rule == "requested") {
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
      try {
        await axiosPrivate.post("/friends/add", {
          receiver: uid,
          sender: user.uid,
        });
        setDone(true);
      } catch (error) {
        console.log(error);
      }
    }
    addFriend();
  }

  return (
    <button
      className="button--3 px-4 text-sm md:px-8 md:text-xl"
      onClick={handleAddFriend}
      disabled={isDone}
    >
      addFriend
    </button>
  );
};
