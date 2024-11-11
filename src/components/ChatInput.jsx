import sendIcon from '../assets/images/send.svg';
import useAutosize from '../hooks/useAutosize';

function ChatInput({ newMessage, isLoading, setNewMessage, submitNewMessage }) {
  const textareaRef = useAutosize(newMessage);

  function handleKeyDown(e) {
    if (e.keyCode === 13 && !e.shiftKey && !isLoading) {
      e.preventDefault();
      submitNewMessage();
    }
  }

  return (
    <div className="sticky bottom-0 bg-gray-900 py-4">
      <div className="p-1.5 bg-gray-700 rounded-3xl z-50 font-mono origin-bottom animate-chat duration-400">
        <div className="pr-0.5 bg-gray-800 relative shrink-0 rounded-3xl overflow-hidden ring-gray-600 ring-1 focus-within:ring-indigo-400 transition-all">
          <textarea
            className="block w-full max-h-[140px] py-2 px-4 pr-11 bg-gray-800 text-gray-200 placeholder:text-gray-400 placeholder:leading-4 placeholder:-translate-y-1 sm:placeholder:leading-normal sm:placeholder:translate-y-0 focus:outline-none"
            ref={textareaRef}
            rows="1"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="absolute top-1/2 -translate-y-1/2 right-3 p-1 rounded-md hover:bg-gray-600"
            onClick={submitNewMessage}
            disabled={isLoading}
          >
            <img src={sendIcon} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
