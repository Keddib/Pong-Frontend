import { FunctionComponent, useState } from "react";
import { Conversation } from "types/app";
import useAxiosPrivate from "hooks/useAxiosPrivate";

const JoinRoom: FunctionComponent<{
  setShowModal: (b: boolean) => void;
  conv: Conversation;
}> = ({ setShowModal, conv }) => {
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();

  async function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    setError("");
    const target = e.target as typeof e.target & {
      elements: {
        password: { value: string };
      };
    };
    const password = target.elements.password.value;
    try {
      await axiosPrivate.post('/chat/join', {
        roomId: conv.id,
        password: password,
      });
    } catch (err) {
      setError("somthing went wrong! please try again");
    }
  }

  async function join() {
    try {
      await axiosPrivate.post('/chat/join', {
        roomId: conv.id,
      });
    } catch (err) {
      setError("upload filed! please try again");
    }
  }
  return (
    <div className="modal ">
      <div className="modal-content w-[300px] bg-queenBlue/50">
        <h4 className="text-4xl text-center text-yonder break-words w-full">
          Join <span className="text-lotion break-words">{conv.name}</span>
        </h4>
        <p className="text-center text-yonder">{conv.description} tes test</p>
        {conv.type == "protected" ? (
          <JoinProtected submit={submit} />
        ) : (
          <JoinPublic join={join} />
        )}
        {error && <p className="text-red/70">{error}</p>}
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
      </div>
    </div>
  );
};

export default JoinRoom;

const JoinPublic: FunctionComponent<{ join: () => void }> = ({ join }) => {
  return (
    <div className="w-[200px]">
      <button className="button--2" onClick={join}>
        Join
      </button>
    </div>
  );
};

const JoinProtected: FunctionComponent<{
  submit: (e: React.SyntheticEvent) => void;
}> = ({ submit }) => {
  return (
    <form className="" onSubmit={submit}>
      <label
        htmlFor="password"
        className="block font-poppins capitalize w-[200px]"
      >
        <span className="text-lotion">password</span>
        <input
          id="password"
          placeholder="password"
          type="password"
          className="input--2 text-lotion border border-lotion placeholder-lotion/50"
          minLength={4}
          required
          autoComplete="off"
        />
      </label>
      <div className="w-[200px] mt-4">
        <button className="button--2" type="submit">
          Join
        </button>
      </div>
    </form>
  );
};
