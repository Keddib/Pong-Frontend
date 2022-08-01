import SendIcon from "assets/icons/dm.svg";

const MessageInput = () => {
  return (
    <div className="message-input">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(`message for ${e.target.messageInput.value}`);
        }}
      >
        <label
          htmlFor="send-message"
          className="mb-2 text-sm font-medium text-lotion/50 sr-only"
        >
          message
        </label>
        <div className="relative flex items-center">
          <input
            type="message"
            name="messageInput"
            id="default-message"
            className="message-bar-input"
            placeholder="message for players..."
            required
          />
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <SendIcon className="fill-pictonBlue w-5 h-5" />
          </div>
          <button type="submit"></button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
