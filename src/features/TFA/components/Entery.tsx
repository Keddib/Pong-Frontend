import Twofa from "assets/images/twofa.png";
import { useContext } from "react";
import TFAcontext from "../context/TFAcontext";

const Entry = () => {
  const TFAservice = useContext(TFAcontext);
  // const [state] = useActor(TFAservice);

  return (
    <>
      <img alt="two factor logo" src={Twofa} />
      <h4 className="text-2xl text-center">
        Protect your account in just two steps
      </h4>

      <div className=" flex justify-between items-center gap-6 w-full font-poppins  px-4">
        <div>
          <span className="rounded-full bg-spaceCadet w-8 h-8 flex justify-center items-center text-lotion">
            1
          </span>
        </div>
        <div>
          <p>Link an authentication app to your Twitter account</p>
          <p className=" text-black/50">
            Use a compatible authentication app (like Google Authenticator,
            Authy, Duo Mobile, 1Password, etc.) We’ll generate a QR code for you
            to scan.
          </p>
        </div>
      </div>
      <div className=" flex justify-between items-center gap-6 w-full font-poppins  px-4">
        <div>
          <span className="rounded-full bg-spaceCadet w-8 h-8 flex justify-center items-center text-lotion">
            2
          </span>
        </div>
        <div>
          <p>Enter the confirmation code</p>
          <p className=" text-black/50">
            Two-factor authentication will then be turned on for authentication
            app, which you can turn off at any time.
          </p>
        </div>
      </div>
      <div className="px-10 w-full mt-4">
        <button
          className="button--1"
          onClick={() => {
            TFAservice.send({ type: "CONTINUE" });
          }}
        >
          continue
        </button>
      </div>
    </>
  );
};

export default Entry;
