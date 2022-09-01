import Xmark from "assets/icons/xmark.svg";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import Dropdown from "components/Dropdown";
import { Spinner } from "components/Loading";
import { User } from "types/app";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { getData } from "../../services/GetFormData";
import useAuth from "hooks/useAuth";
export { getData } from "../../services/GetFormData";

const RoomForm = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const doneButtonRef = useRef(null);
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [friends, setFriends] = useState([] as User[]);

  useEffect(() => {
    const abortController = new AbortController();
    async function getFriends() {
      try {
        const res = await axiosPrivate.get<User[]>("/friends/all", {
          signal: abortController.signal,
        });
        setFriends(res.data);
        setLoading(false);
        console.log("well");
      } catch (error) {
        setLoading(false);
      }
    }
    getFriends();
    return () => {
      abortController.abort();
    };
  }, [axiosPrivate]);

  function showDropDown() {
    console.log("clicked....");
    setShow(!show);
  }

  async function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (doneButtonRef.current) {
      const currentButton = doneButtonRef.current as typeof doneButtonRef & {
        disabled: boolean;
      };
      currentButton.disabled = true;
    }
    setLoading(true);
    setError("");
    const data = getData(e);
    console.log("data", data);
    const dataMembers = friends.filter((f) => {
      return data.members.includes(f.uid);
    });
    dataMembers.push(user);
    try {
      await axiosPrivate.post(`/chat/createRoom`, {
        type: data.type,
        owner: user.uid,
        name: data.name,
        description: data.description,
        password: data?.password,
        members: dataMembers,
      });
      showDropDown();
    } catch (err) {
      setError("upload filed! please try again");
    }
    if (doneButtonRef.current) {
      const currentButton = doneButtonRef.current as typeof doneButtonRef & {
        disabled: boolean;
      };
      currentButton.disabled = false;
    }
    setLoading(false);
  }

  return (
    <div className="creat-room-popup relative">
      <button className="button--2" onClick={showDropDown}>
        create one
      </button>
      {show && (
        <Dropdown className="sm:w-[400px] max-h-[1000px]">
          <>
            <div className="flex justify-end">
              <button onClick={showDropDown}>
                <Xmark className="w-5 h-5 fill-lotion/50 hover:fill-lotion" />
              </button>
            </div>
            <form className="flex flex-col gap-2 w-full" onSubmit={submit}>
              {/* <span>Private</span> */}
              <div className="flex gap-4">
                <label className="switch " htmlFor="private">
                  <input id="private" type="checkbox" />
                  <span className="slider round"></span>
                </label>
                <span>Private</span>
              </div>
              <label
                htmlFor="RoomName"
                className="block font-poppins capitalize "
              >
                <span className="text-lotion">Room Name</span>
                <input
                  autoComplete="off"
                  maxLength={32}
                  id="RoomName"
                  placeholder="Room Name"
                  type="text"
                  className="input--2 text-lotion border border-lotion placeholder-lotion/50"
                  required
                />
              </label>
              <label
                htmlFor="Description"
                className="block font-poppins capitalize "
              >
                <span className="text-lotion">Description</span>
                <input
                  autoComplete="off"
                  maxLength={50}
                  id="Description"
                  placeholder="Description"
                  type="text"
                  className="input--2 text-lotion border border-lotion placeholder-lotion/50"
                  required
                />
              </label>
              <label
                htmlFor="Password"
                className="block font-poppins capitalize "
              >
                <span className="text-lotion">Password</span>
                <input
                  autoComplete="off"
                  id="Password"
                  placeholder="Password"
                  type="password"
                  className="input--2 text-lotion border border-lotion placeholder-lotion/50"
                />
              </label>
              <SelectFriends friends={friends} />
              <button
                ref={doneButtonRef}
                type="submit"
                className="button--2 flex justify-center items-center"
              >
                {loading ? <Spinner /> : "Done"}
              </button>
              {error && <p className="text-red/70 text-center">{error}</p>}
            </form>
          </>
        </Dropdown>
      )}
    </div>
  );
};

export default RoomForm;

const SelectFriends: FunctionComponent<{ friends: User[] }> = ({ friends }) => {
  return (
    <>
      <div className="border-b h-fit max-h-[200px] border-b-queenBlue overflow-auto no-scrollbar">
        <ul className="h-fit">
          {friends.length ? (
            <>
              {friends.map((friend) => (
                <li key={friend.uid} className="mb-1">
                  <SelectFriend user={friend} />
                </li>
              ))}
            </>
          ) : (
            <p className="text-center">no friends found</p>
          )}
        </ul>
      </div>
    </>
  );
};

const SelectFriend: FunctionComponent<{ user: User }> = ({ user }) => {
  return (
    <label htmlFor={user.username} className="input-container">
      <div className="flex items-center">
        <div className="w-10 h-10">
          <img src={user.avatar} alt="user" />
        </div>
        <div className="group-hover:text-lotion/70 ml-2">
          <h4 className="text-sm">{user.nickname}</h4>
          <p className="text-[10px]">{user.username}</p>
        </div>
      </div>
      <input
        name="friend"
        id={user.username}
        type="checkbox"
        value={user.uid}
      />
      <span className="checkmark"></span>
    </label>
  );
};
