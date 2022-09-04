import { useActor } from "@xstate/react";
import axios from "axios";
import { useContext, useState } from "react";
import { Spinner } from "components/Loading";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import TFAcontext from "../context/TFAcontext";

const Confirm = () => {
  const TFAservice = useContext(TFAcontext);
  const [state] = useActor(TFAservice);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  async function hundleSubmit(e: React.SyntheticEvent) {
    setLoading(true);
    e.preventDefault();
    const target = e.target as typeof e.target & {
      elements: {
        code: {
          value: string;
          disable: boolean;
        };
      };
    };

    target.elements.code.disable = true;
    const code = target.elements.code.value;

    try {
      await axiosPrivate.post("auth/enable-tfa", {
        code: code,
        secret: state.context.secret,
      });
      TFAservice.send({ type: "SUCCESS" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status == 401) {
          TFAservice.send({ type: "INVALIDCODE" });
          setLoading(false);
          return;
        }
      }
      TFAservice.send({ type: "FAILED" });
    }
  }

  return (
    <>
      <div className="px-10 w-full mt-4 flex flex-col gap-4">
        <h4 className="text-2xl ">Enter the confirmation code</h4>
        <p>
          Follow the instructions on the authentication app to link your Pong
          account. Once the authentication app generates a confirmation code,
          enter it here.
        </p>
        <p>
          If the authentication process fails, go back to link the app to your
          Pong account and restart the process.
        </p>
      </div>
      <form
        className="px-10 w-full mt-4 flex flex-col gap-4"
        onSubmit={hundleSubmit}
      >
        <label htmlFor="code" className="block font-poppins capitalize ">
          <span className="text-black">code</span>
          <input
            id="code"
            placeholder="code"
            type="text"
            className="input--2 text-spaceCadet border border-pictonBlue placeholder-black/50"
            required
          />
        </label>
        {state.context.error && (
          <p className="text-red/60">invalid code please retry</p>
        )}
        <button type="submit" className="button--1">
          {loading ? <Spinner /> : "confirm"}
        </button>
      </form>
    </>
  );
};

export default Confirm;
