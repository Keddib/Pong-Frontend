import SendIcon from "assets/icons/dm.svg";
import { FunctionComponent } from "react";

const MessageInput: FunctionComponent<{ setMsg: (msg: string) => void }> = ({
  setMsg,
}) => {
  function hundleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      messageInput: { value: string };
    };
    const msg = target.messageInput.value;
    console.log(`message for ${msg}`);
    setMsg(msg);
    target.messageInput.value = "";
  }

  return (
    <div className="message-bar">
      <form onSubmit={hundleSubmit}>
        <label
          htmlFor="send-message"
          className="mb-2 text-sm font-medium text-lotion/50 sr-only"
        >
          message
        </label>
        <div className="message-input-wrapper">
          <input
            autoComplete="off"
            type="message"
            name="messageInput"
            id="default-message"
            className="message-input"
            placeholder="message for players..."
            required
          />
          <div className="flex items-center pr-4">
            <button type="submit">
              <SendIcon className="fill-pictonBlue w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;