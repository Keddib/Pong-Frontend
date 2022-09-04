import { useActor } from "@xstate/react";
import { FunctionComponent, useContext } from "react";
import Logo from "components/Logo";
import TFAcontext from "../context/TFAcontext";

const Success: FunctionComponent<{
  setShowModal: (b: boolean) => void;
}> = ({ setShowModal }) => {
  const TFAservice = useContext(TFAcontext);
  const [state] = useActor(TFAservice);

  return (
    <>
      <Logo className="" link="" />
      <div className="px-10 w-full mt-4 flex flex-col gap-4">
        <h4 className="text-2xl ">You’re all set</h4>
        <p>
          Now you can use the mobile authentication app to get an authentication
          code any time you log in to Pong.
        </p>
        <p>Save this single-use backup code in a safe place.</p>
        <div className="w-fit">
          <code className="border border-black p-1 px-4 rounded-sm bg-yonder/30">
            {state.context.secret}
          </code>
        </div>
        <p>
          This backup code lets you log in to Pong if you can&apos;t receive a
          text message or don&apos;t have access to any of your other two-factor
          authentication methods.
        </p>
      </div>
      <div className="px-10 w-full mt-4">
        <button
          className="button--1"
          onClick={() => {
            setShowModal(false);
          }}
        >
          Done
        </button>
      </div>
    </>
  );
};

export default Success;
