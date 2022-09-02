import Xmark from "assets/icons/xmark.svg";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Dropdown from "components/Dropdown";
import { Spinner } from "components/Loading";
import { User } from "types/app";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { getData } from "../../services/GetFormData";
import useAuth from "hooks/useAuth";
import SelectFriends from "components/SelectFriends";

const RoomForm: FunctionComponent<{
  setRefresh: Dispatch<SetStateAction<boolean>>;
}> = ({ setRefresh }) => {
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
      setRefresh((prev) => !prev);
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
