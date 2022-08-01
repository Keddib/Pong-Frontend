import SendIcon from "assets/icons/dm.svg";

const MessageInput = () => {
  return (
    <div className="message-bar">
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
