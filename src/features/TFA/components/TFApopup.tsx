import Xmark from "assets/icons/xmark.svg";
import { useActor, useInterpret } from "@xstate/react";
import { FunctionComponent } from "react";
import TFAcontext from "../context/TFAcontext";
import TFAmachine from "../services/TFAmachine";
import Confirm from "./Confirm";
import Entry from "./Entery";
import Error from "./Error";
import Scanning from "./Scanning";
import Success from "./Success";

const TFApopup: FunctionComponent<{
  setShowModal: (b: boolean) => void;
}> = ({ setShowModal }) => {
  const TFAservice = useInterpret(TFAmachine);
  const [state] = useActor(TFAservice);

  const step = (() => {
    if (state.matches("entry")) return <Entry />;
    if (state.matches("scanning")) return <Scanning />;
    if (state.matches("confirm")) return <Confirm />;
    if (state.matches("success"))
      return <Success setShowModal={setShowModal} />;
    if (state.matches("error")) return <Error />;
    return null;
  })();

  return (
    <div className="modal ">
      <div className="modal-content relative">
        <TFAcontext.Provider value={TFAservice}>{step}</TFAcontext.Provider>
        <div className=" absolute top-4 right-4">
          <button
            onClick={() => {
              setShowModal(false);
            }}
          >
            <Xmark className="w-4 fill-spaceCadet hover:fill-spaceCadet/50" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TFApopup;
