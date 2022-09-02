import UserPlus from "assets/icons/user-plus.svg";
import UserMinus from "assets/icons/user-minus.svg";
import Ban from "assets/icons/ban.svg";
import Mute from "assets/icons/mute.svg";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Conversation, User } from "types/app";
import GroupMember from "./GroupMember";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import SelectFriends from "components/SelectFriends";
import { Spinner } from "components/Loading";

const GroupMembers: FunctionComponent<{
  conv: Conversation;
  position: string;
  setRefresh: (b: boolean) => void;
}> = ({ conv, position, setRefresh }) => {
  const [show, setShow] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  function addMemeber() {
    //
    console.log("....->");
  }

  async function removeMember(mId: string) {
    try {
      await axiosPrivate.post("chat/removemember", {
        cid: conv.cid,
        uid: mId,
      });
      // refresh
      setRefresh(true);
    } catch (error) {
      console.log("error chat/admin", error);
    }
  }

  async function setMemberAdmin(mId: string) {
    console.log(conv.cid, mId);
    try {
      await axiosPrivate.post("chat/admin", {
        cid: conv.cid,
        uid: mId,
      });
      // refresh
      setRefresh(true);
    } catch (error) {
      console.log("error chat/admin", error);
    }
  }

  if (show) {
    return (
      <div className="messages-members rounded-3xl bg-queenBlue/50 pt-2 pb-6 pl-1">
        search for friends
      </div>
    );
  }

  return (
    <div className="messages-members rounded-3xl bg-queenBlue/50 pt-2 pb-6 pl-1">
      <p className="py-2"> members</p>
      {(position == "admin" || position == "owner") && (
        <AddMemeberToGroup conv={conv} />
      )}
      <ul className="flex-col flex gap-1 ">
        {conv.members.map((member) => {
          return (
            <li key={member.uid} className=" flex items-center justify-between">
              <GroupMember member={member}>
                <>
                  {(position == "admin" || position == "owner") && (
                    <>
                      <button
                        className="start chating flex gap-2 items-center group text-lotion/50 hover:text-lotion"
                        onClick={() => {
                          setMemberAdmin(member.uid);
                        }}
                      >
                        <UserPlus className="w-6 h-6  fill-lotion/50 group-hover:fill-lotion ease-in duration-150" />
                        add as admin
                      </button>
                      <button
                        className="start chating flex gap-2 items-center group text-lotion/50 hover:text-lotion"
                        onClick={() => {
                          removeMember(member.uid);
                        }}
                      >
                        <UserMinus className="w-6 h-6  fill-lotion/50 group-hover:fill-lotion ease-in duration-150" />
                        remove
                      </button>
                      <button
                        className="start chating flex gap-2 items-center group text-lotion/50 hover:text-lotion"
                        onClick={() => {}}
                      >
                        <Ban className="w-5 h-5  fill-lotion/50 group-hover:fill-lotion ease-in duration-150" />
                        ban
                      </button>
                      <button
                        className="start chating flex gap-2 items-center group text-lotion/50 hover:text-lotion"
                        onClick={() => {}}
                      >
                        <Mute className="w-6 h-6  fill-lotion/50 group-hover:fill-lotion ease-in duration-150" />
                        mute for one houre
                      </button>
                    </>
                  )}
                </>
              </GroupMember>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GroupMembers;

const AddMemeberToGroup: FunctionComponent<{ conv: Conversation }> = ({
  conv,
}) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([] as User[]);
  const [error, setError] = useState("");
  const doneButtonRef = useRef(null);
  const axiosPrivate = useAxiosPrivate();

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
      //
      // send request to server
      console.log(members);
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
