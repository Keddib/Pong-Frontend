import UserPlus from "assets/icons/user-plus.svg";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Conversation, User } from "types/app";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import SelectFriends from "components/SelectFriends";
import { Spinner } from "components/Loading";
import useAuth from "src/hooks/useAuth";

const AddMemeberToGroup: FunctionComponent<{
  conv: Conversation;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ conv, setRefresh }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([] as User[]);
  const [error, setError] = useState("");
  const doneButtonRef = useRef(null);
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  useEffect(() => {
    const abortController = new AbortController();
    async function getFriends() {
      try {
        const res = await axiosPrivate.get<User[]>("/friends/all", {
          signal: abortController.signal,
        });
        setFriends(
          res.data.filter((f) => {
            const mem = conv.members.find((m) => m.uid == f.uid);
            return !mem;
          })
        );
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
  }, [axiosPrivate, conv]);

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
    // get data

    const target = e.target as typeof e.target & {
      elements: {
        friend: any;
      };
    };

    const members: string[] = [];
    const memebersElems = target.elements.friend;

    if (memebersElems) {
      if (memebersElems.length != undefined) {
        // multple users
        memebersElems.forEach((node: HTMLInputElement) => {
          if (node.checked) {
            members.push(node.value);
          }
        });
      } else if (memebersElems.checked) {
        // one user
        members.push(memebersElems.value);
      }
    }
    try {
      await axiosPrivate.post<Conversation>("/chat/addmemeber", {
        cid: conv.cid,
        members: members,
      });
      setRefresh((prev) => !prev);
      setShow(false);
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
    <>
      <div className="messages-members rounded-3xl bg-queenBlue/50">
        <button
          className={`message-more-button group my-2 text-lotion/50 hover:text-lotion ${
            show && "text-lotion"
          }`}
          onClick={() => {
            setShow(!show);
          }}
        >
          <UserPlus
            className={`w-6 h-4 fill-lotion/50 group-hover:fill-lotion ease-in duration-150 ${
              show && "fill-lotion"
            } `}
          />
          add member
        </button>
        {show && (
          <div className="p-2 w-full md:w-72 mx-auto">
            <form className="flex flex-col gap-2" onSubmit={submit}>
              <SelectFriends friends={friends} />
              {error && <p className="text-red/70 text-center">{error}</p>}
              <button
                ref={doneButtonRef}
                type="submit"
                className="button--2 flex justify-center items-center"
              >
                {loading ? <Spinner /> : "Done"}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default AddMemeberToGroup;
