import Trash from "assets/icons/trash.svg";
import RightArrow from "assets/icons/right-arrow.svg";
import BottomArrow from "assets/icons/bottom-arrow.svg";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Conversation } from "types/app";
import { Spinner } from "components/Loading";
import useAxiosPrivate from "~/src/hooks/useAxiosPrivate";
import Modal from "~/src/components/Modal";

const EditPassword: FunctionComponent<{
  conv: Conversation;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ conv, setRefresh }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const doneButtonRef = useRef(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    return () => {
      setShow(false);
      setLoading(false);
      setError("");
    };
  }, []);

  async function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (doneButtonRef.current) {
      const currentButton = doneButtonRef.current as typeof doneButtonRef & {
        disabled: boolean;
      };
      currentButton.disabled = true;
    }
    setError("");
    setLoading(true);
    // get data
    const target = e.target as typeof e.target & {
      elements: {
        OldPassword: { value: string };
        Password: { value: string };
        Password2: { value: string };
      };
    };

    // collect data
    const oldPassword = target.elements.OldPassword?.value;
    const newPassword = target.elements.Password.value;
    const confirmPassword = target.elements.Password2.value;

    if (confirmPassword != newPassword) {
      setError("invalid password");
    } else {
      try {
        // send data to server
        console.log(oldPassword, newPassword, confirmPassword);
        await axiosPrivate.post("chat/updateroompass", {
          cid: conv.cid,
          oldPass: oldPassword,
          newPass: newPassword,
        });
        setRefresh((prev) => !prev);
      } catch (err) {
        setError("failed to update! please try again");
      }
    }
    if (doneButtonRef.current) {
      const currentButton = doneButtonRef.current as typeof doneButtonRef & {
        disabled: boolean;
      };
      currentButton.disabled = false;
    }
    setLoading(false);
  }

  async function deletePassword() {
    //
    console.log("----> delete password");
    setRefresh((prev) => !prev);
  }

  const modal = showModal ? (
    <Modal>
      <div className="modal ">
        <div className="modal-content w-[300px] bg-queenBlue/50  text-lotion">
          <h4>Delete Room Password</h4>
          <div className="w-[200px]">
            <button className="button--2" onClick={deletePassword}>
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
            {error && (
              <p className="text-red text-center text-xs mt-2">{error}</p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  ) : null;

  if (conv.type == "privategroup") {
    return <></>;
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
                      minLength={4}
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
                  minLength={4}
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
                  minLength={4}
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
            </form>
            {conv.type == "protected" && (
              <>
                <button
                  className="flex m-auto mt-2 items-center justify-center gap-2 text-xs group hover:text-red/70"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <Trash className="w-5 h-3 fill-lotion/50 group-hover:fill-red/70 ease-in duration-150" />
                  delete password
                </button>
                {modal}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default EditPassword;
