import Xmark from "assets/icons/xmark.svg";
import { useRef, useState } from "react";
import Dropdown from "components/Dropdown";
import { Spinner } from "~/src/components/Loading";

const RoomForm = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const doneButtonRef = useRef(null);

  function showDropDown() {
    setShow(!show);
  }

  function submit() {
    //
  }

  return (
    <div className="creat-room-popup relative">
      <button className="button--2" onClick={showDropDown}>
        create one
      </button>
      {show && (
        <Dropdown className="sm:w-[400px]">
          <>
            <div className="flex justify-end">
              <button onClick={showDropDown}>
                <Xmark className="w-5 h-5 fill-lotion/50 hover:fill-lotion" />
              </button>
            </div>
            <form
              className="flex flex-col gap-8 pt-4 w-full max-w-[400px]"
              onSubmit={submit}
            >
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
                  id="RoomName"
                  placeholder="Room Name"
                  type="text"
                  className="input--2 text-lotion border border-lotion placeholder-lotion/50"
                />
              </label>
              <label
                htmlFor="Password"
                className="block font-poppins capitalize "
              >
                <span className="text-lotion">Password</span>
                <input
                  id="Password"
                  placeholder="Password"
                  type="password"
                  className="input--2 text-lotion border border-lotion placeholder-lotion/50"
                />
              </label>
              {error && <p className="text-red/70">{error}</p>}
              <button
                ref={doneButtonRef}
                type="submit"
                className="button--2 flex justify-center items-center"
              >
                {loading ? <Spinner /> : "Done"}
              </button>
            </form>
          </>
        </Dropdown>
      )}
    </div>
  );
};

export default RoomForm;
