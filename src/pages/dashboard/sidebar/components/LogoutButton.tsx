import Logout from "assets/icons/logout.svg";
import { FunctionComponent, useState } from "react";
import Modal from "components/Modal";
import useLogout from "hooks/useLogout";

const LogoutPopup: FunctionComponent<{
  setShowModal: (b: boolean) => void;
}> = ({ setShowModal }) => {
  const logout = useLogout();

  return (
    <>
      <h4 className="text-4xl text-center">Logout of Pong?</h4>
      <p className="text-center text-black/50">
        You can always log back in at any time.
      </p>
      <div className="w-[200px]">
        <button
          className="button--3"
          onClick={() => {
            logout();
          }}
        >
          Logout
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
    </>
  );
};

function LogoutButton() {
  const [showModal, setShowModal] = useState(false);
  const modal = showModal ? (
    <Modal>
      <LogoutPopup setShowModal={setShowModal} />
    </Modal>
  ) : null;

  console.log("model", showModal);

  return (
    <>
      {modal}
      <button
        className="group mt-4"
        onClick={() => {
          console.log("log button clicked");
          setShowModal(true);
        }}
      >
        <Logout className="nav-icon  group-hover:fill-red/80 " />
      </button>
    </>
  );
}

export default LogoutButton;
