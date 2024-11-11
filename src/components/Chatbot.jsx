import { useState, useEffect } from 'react';
import { useImmer } from 'use-immer';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import api from '../api';

function Chatbot() {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useImmer([]);
  const [newMessage, setNewMessage] = useState('');

  const isLoading = messages.length && messages[messages.length - 1].loading;

  async function submitNewMessage() {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || isLoading) return;

    setMessages((draft) => [
      ...draft,
      { role: 'user', content: trimmedMessage },
      { role: 'assistant', content: '', sources: [], loading: true },
    ]);
    setNewMessage('');

    let chatIdOrNew = chatId;

    try {
      if (!chatId) {
        const { session_id } = await api.createChat();
        setChatId(session_id);
        chatIdOrNew = session_id;
      }

      const stream = await api.sendChatMessage(chatIdOrNew, trimmedMessage);
      setMessages((draft) => {
        draft[draft.length - 1].content += stream.response;
      });

      setMessages((draft) => {
        draft[draft.length - 1].loading = false;
      });
    } catch (err) {
      console.log(err);
      setMessages((draft) => {
        draft[draft.length - 1].loading = false;
        draft[draft.length - 1].error = true;
      });
    }
  }

  // Cleanup session on window refresh or close
  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (chatId) {
        try {
          await api.endSession(chatId);
        } catch (err) {
          console.error('Failed to end session:', err);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [chatId]);

  return (
    <div className="relative max-w-5xl mx-auto grow flex flex-col gap-6 pt-6 bg-gray-900 text-gray-200">
      {/* Welcome Message */}
      <div className="mt-3 font-urbanist text-gray-300 text-xl font-light space-y-2">
        <p>
          👋 <span className="text-gray-100 font-semibold">Welcome!</span>
        </p>
        <p>
          I am powered by the latest technology reports from leading
          institutions like the{' '}
          <span className="text-indigo-400">World Bank</span>, the{' '}
          <span className="text-indigo-400">World Economic Forum</span>,{' '}
          <span className="text-indigo-400">McKinsey</span>,
          <span className="text-indigo-400">Deloitte</span>, and the{' '}
          <span className="text-indigo-400">OECD</span>.
        </p>
        <p>Ask me anything about the latest technology trends.</p>
      </div>
      {/* Chat Messages */}
      <ChatMessages messages={messages} isLoading={isLoading} />
      {/* Chat Input */}
      <ChatInput
        newMessage={newMessage}
        isLoading={isLoading}
        setNewMessage={setNewMessage}
        submitNewMessage={submitNewMessage}
      />
    </div>
  );
}

export default Chatbot;
