import Markdown from 'react-markdown';
import userIcon from '../assets/images/user.svg';
import errorIcon from '../assets/images/error.svg';
import useAutoScroll from '../hooks/useAutoScroll';
import Spinner from './Spinner';

function ChatMessages({ messages, isLoading }) {
  const scrollContentRef = useAutoScroll(isLoading);

  return (
    <div ref={scrollContentRef} className="grow space-y-4">
      {messages.map(({ role, content, loading, error }, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-4 py-4 px-3 rounded-xl ${
            role === 'user'
              ? 'bg-gray-700 text-gray-200'
              : 'bg-gray-800 text-gray-300'
          }`}
        >
          {role === 'user' && (
            <img
              className="h-[26px] w-[26px] shrink-0"
              src={userIcon}
              alt="user"
            />
          )}
          <div>
            <div className="markdown-container">
              {loading && !content ? (
                <Spinner />
              ) : role === 'assistant' ? (
                <Markdown className="text-gray-300">{content}</Markdown>
              ) : (
                <div className="whitespace-pre-line">{content}</div>
              )}
            </div>
            {error && (
              <div
                className={`flex items-center gap-1 text-sm text-red-500 ${
                  content && 'mt-2'
                }`}
              >
                <img className="h-5 w-5" src={errorIcon} alt="error" />
                <span>Error generating the response</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
