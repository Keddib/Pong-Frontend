import { useContext } from "react";
import { Spinner } from "components/Loading";
import TFAcontext from "../context/TFAcontext";
import { useActor } from "@xstate/react";

const Scanning = () => {
  const TFAservice = useContext(TFAcontext);
  const [state] = useActor(TFAservice);

  return (
    <>
      <h4 className="text-2xl text-center">
        Link the app to your Twitter account
      </h4>
      <p className="text-center">
        Use your authentication app to scan this QR code. If you don’t have an
        authentication app on your device, you’ll need to install one now.
      </p>
      <div className="w-[228px] h-[228px]">
        {state.context.QRcodeUrl ? (
          <img alt="QR code" src={state.context.QRcodeUrl} />
        ) : (
          <Spinner />
        )}
      </div>
      <div className="px-10 w-full mt-4">
        <button
          className="button--1"
          onClick={() => {
            TFAservice.send({ type: "NEXT" });
          }}
        >
          next
        </button>
      </div>
    </>
  );
};

export default Scanning;
