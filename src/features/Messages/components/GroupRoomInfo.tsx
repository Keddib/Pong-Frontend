import Trash from "assets/icons/trash.svg";
import Leave from "assets/icons/logout.svg";
import { FunctionComponent, useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import { Conversation } from "types/app";
import GroupMembers from "./GroupMembers";
import GroupAdmins from "./GroupAdmins";
import useAxiosPrivate from "~/src/hooks/useAxiosPrivate";
import Modal from "~/src/components/Modal";
import { useNavigate } from "react-router-dom";
import EditPassword from "./GroupPassword";

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
        <EditPassword conv={conv} setRefresh={setRefresh} />
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
