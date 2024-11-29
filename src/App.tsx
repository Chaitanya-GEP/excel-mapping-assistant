import React, { useState, useEffect } from 'react';
import { FileUpload } from './components/FileUpload';
import { ChatMessage } from './components/ChatMessage';
import { MessageInput } from './components/MessageInput';
import { NewChatButton } from './components/NewChatButton';
import { WelcomeMessage } from './components/WelcomeMessage';
import { ChatMessage as ChatMessageType } from './types/mapping';
import { analyzeExcelFile } from './services/api';

function App() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMessage = async (message: string, files: File[]) => {
    setIsProcessing(true);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'user',
        content: message || 'Uploaded files for analysis',
        files,
      },
    ]);

    try {
      for (const file of files) {
        const response = await analyzeExcelFile(file);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            type: 'assistant',
            content: response,
          },
        ]);
      }

      if (message && files.length === 0) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            type: 'assistant',
            content: "I'm ready to help you analyze Excel files. Please upload them using the attachment button or drag and drop them here.",
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: 'Sorry, there was an error processing your request.',
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApprove = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'Mapping approved and saved successfully!',
      },
    ]);
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between max-w-[1920px] mx-auto">
          <h1 className="text-xl font-semibold text-gray-100">
            Quantum Excel Import Assistant
          </h1>
          <NewChatButton onClick={handleNewChat} disabled={isProcessing} />
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col max-w-[1920px] mx-auto">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="space-y-6">
              {messages.length === 0 ? (
                <WelcomeMessage />
              ) : (
                messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    onApprove={handleApprove}
                  />
                ))
              )}
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-700 p-4">
            <div className="max-w-[1920px] mx-auto">
              <MessageInput onSend={handleMessage} isProcessing={isProcessing} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;