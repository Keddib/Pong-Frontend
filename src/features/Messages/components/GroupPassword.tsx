import Trash from "assets/icons/trash.svg";
import RightArrow from "assets/icons/right-arrow.svg";
import BottomArrow from "assets/icons/bottom-arrow.svg";
import { FunctionComponent, useRef, useState } from "react";
import { Conversation } from "types/app";
import { Spinner } from "~/src/components/Loading";

const EditPassword: FunctionComponent<{
  conv: Conversation;
  setRefresh: (b: boolean) => void;
}> = ({ conv, setRefresh }) => {
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

    try {
      // send data to server
      console.log(oldPassword, newPassword, confirmPassword);
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

export default EditPassword;
