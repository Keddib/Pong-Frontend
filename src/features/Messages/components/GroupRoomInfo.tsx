import Trash from "assets/icons/trash.svg";
import Leave from "assets/icons/logout.svg";
import RightArrow from "assets/icons/right-arrow.svg";
import BottomArrow from "assets/icons/bottom-arrow.svg";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import useAuth from "hooks/useAuth";
import { Conversation } from "types/app";
import GroupMembers from "./GroupMembers";
import GroupAdmins from "./GroupAdmins";
import useAxiosPrivate from "~/src/hooks/useAxiosPrivate";
import Modal from "~/src/components/Modal";
import { useNavigate } from "react-router-dom";
import { Spinner } from "~/src/components/Loading";

const GroupRoomInfo: FunctionComponent<{
  conv: Conversation;
  setRefresh: (b: boolean) => void;
}> = ({ conv, setRefresh }) => {
  const [userPosition, setUserPosition] = useState(
    "" as "admin" | "owner" | "member"
  );
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (conv.owner.uid == user.uid) {
      setUserPosition("owner");
    } else if (conv.admins.find((u) => u.uid == user.uid)) {
      setUserPosition("admin");
    } else {
      setUserPosition("member");
    }
  }, []);

  async function leaveRoom() {
    //
    try {
      await axiosPrivate.post("chat/removemember", {
        cid: conv.cid,
        uid: user.uid,
      });
      setShowModal(false);
      // refresh
      navigate("/messages");
    } catch (error) {
      // set error
      console.log("delete error", error);
    }
    //
  }
  async function deleteRoom() {
    try {
      //

      const res = await axiosPrivate.delete(`chat/${conv.cid}`);
      console.log("---->", res);
      setShowModal(false);
      // refresh
      navigate("/messages");
    } catch (error) {
      // set error
      console.log("delete error", error);
    }
    //
  }

  const modal = showModal ? (
    <Modal>
      <ConfirmAction
        action={action}
        setShowModal={setShowModal}
        leaveRoom={leaveRoom}
        deleteRoom={deleteRoom}
      />
    </Modal>
  ) : null;

  return (
    <>
      {modal}
      <h4>{conv.name} info</h4>
      <p>
        {conv.name}, {conv.members.length} memeber
      </p>
      <GroupMembers
        conv={conv}
        position={userPosition}
        setRefresh={setRefresh}
      />
      <GroupAdmins
        conv={conv}
        position={userPosition}
        setRefresh={setRefresh}
      />

      {userPosition == "admin" || userPosition == "owner" ? (
        <EditPassword conv={conv} />
      ) : (
        <></>
      )}

      <button
        className="message-more-button group hover:text-red/70"
        onClick={() => {
          setAction("leave");
          setShowModal(true);
        }}
      >
        <Leave className="w-6 h-4 fill-lotion/50 group-hover:fill-red/70 ease-in duration-150" />
        leave room
      </button>
      {userPosition == "owner" && (
        <button
          className="message-more-button group hover:text-red/70"
          onClick={() => {
            setAction("delete");
            setShowModal(true);
          }}
        >
          <Trash className="w-6 h-4 fill-lotion/50 group-hover:fill-red/70 ease-in duration-150" />
          delete room
        </button>
      )}
      <p className="py-4 text-yonder">owned by {conv.owner.nickname}</p>
    </>
  );
};
export default GroupRoomInfo;

const ConfirmAction: FunctionComponent<{
  setShowModal: (b: boolean) => void;
  leaveRoom: () => void;
  deleteRoom: () => void;
  action: string;
}> = ({ setShowModal, action, deleteRoom, leaveRoom }) => {
  return (
    <div className="modal ">
      <div className="modal-content w-[300px] bg-queenBlue/50  text-lotion">
        <h4>{action === "delete" ? "Delete Room" : "Leave Room"}</h4>
        <div className="w-[200px]">
          <button
            className="button--2"
            onClick={() => {
              if (action == "delete") {
                deleteRoom();
              } else {
                leaveRoom();
              }
            }}
          >
            confirm
          </button>
        </div>
        <div className="w-[200px]">
          <button
            className="button--5"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const EditPassword: FunctionComponent<{ conv: Conversation }> = ({ conv }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const doneButtonRef = useRef(null);

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
    try {
      //
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

  function deletePassword() {
    //
  }

  return (
    <>
      <div className="messages-members rounded-3xl bg-queenBlue/50">
        <button
          onClick={() => {
            setShow(!show);
          }}
          className={`group text-lotion/50 hover:text-lotion ease-in duration-150 flex items-center justify-center w-full ${
            show && "text-lotion"
          }`}
        >
          {show ? (
            <BottomArrow
              className={`w-6 h-6  fill-lotion/50 group-hover:fill-lotion ease-in duration-150 ${
                show && "fill-lotion"
              } `}
            />
          ) : (
            <RightArrow className="w-6 h-6  fill-lotion/50 group-hover:fill-lotion ease-in duration-150" />
          )}
          {conv.type == "protected"
            ? "edit password"
            : conv.type == "public"
            ? "add password"
            : ""}
        </button>
        {show && (
          <div className="p-2 w-full md:w-72 mx-auto">
            <form className="flex flex-col gap-2" onSubmit={submit}>
              {conv.type == "protected" && (
                <>
                  <label
                    htmlFor="OldPassword"
                    className="block font-poppins capitalize "
                  >
                    <span className="text-lotion">Old Password</span>
                    <input
                      autoComplete="off"
                      id="OldPassword"
                      placeholder="Old Password"
                      type="password"
                      className="input--2 text-lotion border border-lotion placeholder-lotion/50"
                    />
                  </label>
                </>
              )}
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
              <label
                htmlFor="Password2"
                className="block font-poppins capitalize "
              >
                <span className="text-lotion">Confirm Password</span>
                <input
                  autoComplete="off"
                  id="Password2"
                  placeholder="Confirm Password"
                  type="password"
                  className="input--2 text-lotion border border-lotion placeholder-lotion/50"
                />
              </label>
              <button
                ref={doneButtonRef}
                type="submit"
                className="button--2 flex justify-center items-center"
              >
                {loading ? <Spinner /> : "Done"}
              </button>
              {error && <p className="text-red/70 text-center">{error}</p>}
              {conv.type == "protected" && (
                <button
                  className="flex items-center justify-center gap-2 text-xs group hover:text-red/70"
                  onClick={deletePassword}
                >
                  <Trash className="w-5 h-3 fill-lotion/50 group-hover:fill-red/70 ease-in duration-150" />
                  delete password
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </>
  );
};
