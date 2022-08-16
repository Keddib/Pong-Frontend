import { useState } from "react";
import Modal from "components/Modal";
import TFApopup from "./components/TFApopup";

const TwoFA = () => {
  const [showModal, setShowModal] = useState(false);
  const modal = showModal ? (
    <Modal>
      <TFApopup setShowModal={setShowModal} />
    </Modal>
  ) : null;
  return (
    <>
      {modal}
      <button
        className="text-sm font-light text-lotion/50 hover:text-lotion"
        onClick={() => {
          console.log("log button clicked");
          setShowModal(true);
        }}
      >
        enable Two-factor authentication 🔑
      </button>
    </>
  );
};

export default TwoFA;
