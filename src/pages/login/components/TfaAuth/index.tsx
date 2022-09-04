import React, { FormEvent, FunctionComponent, useState } from "react";
import axios from "axios";
import Modal from "components/Modal";
import { Spinner } from "components/Loading";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { User } from "types/app";

const Confirm: FunctionComponent<{ from: string }> = ({ from }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { setAccessToken, signin } = useAuth();

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
      const res = await axiosPrivate.post<{ access_token: string }>(
        "2fa/authenticate",
        {
          code: code,
        },
        {
          withCredentials: true,
        }
      );
      setAccessToken(res.data.access_token);
      signin({} as User);
      navigate(from, { replace: true });
      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status == 401) {
          setError("invalid code please retry");
          setLoading(false);
          return;
        }
      }
      setError("server error, please try later");
      setLoading(false);
    }
  }

  return (
    <>
      <div className="px-10 w-full mt-4 flex flex-col gap-4">
        <h4 className="text-2xl ">Enter your verification code</h4>
        <p>
          Use your code generator app to generate a code and enter it below.
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
        {error && <p className="text-red/60">{error}</p>}
        <button type="submit" className="button--1">
          {loading ? <Spinner /> : "confirm"}
        </button>
        <button className="button--5">cancel</button>
      </form>
    </>
  );
};

const TfaAuth: FunctionComponent<{ from: string }> = ({ from }) => {
  return (
    <Modal>
      <div className="modal ">
        <div className="modal-content relative">
          <Confirm from={from} />
        </div>
      </div>
    </Modal>
  );
};

export default TfaAuth;
