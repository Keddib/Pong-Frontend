import Oops from "assets/images/opps.png";
import { useContext } from "react";
import TFAcontext from "../context/TFAcontext";

const Error = () => {
  const TFAservice = useContext(TFAcontext);

  return (
    <>
      <div className="w-[228px] h-[228px]">
        <img alt="two factor logo" src={Oops} />
      </div>
      <div className="px-10 w-full mt-4 flex flex-col gap-4">
        <h4 className="text-2xl text-center">Oops Somthing went wrong</h4>
        <p className="text-center">please retry</p>
      </div>
      <div className="px-10 w-full mt-4">
        <button
          className="button--1"
          onClick={() => {
            TFAservice.send({ type: "RETRY" });
          }}
        >
          retry
        </button>
      </div>
    </>
  );
};

export default Error;
