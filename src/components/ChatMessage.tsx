import React from 'react';
import { Bot, User, FileText } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types/mapping';
import { MappingResult } from './MappingResult';

interface ChatMessageProps {
  message: ChatMessageType;
  onApprove: () => void;
}

export function ChatMessage({ message, onApprove }: ChatMessageProps) {
  return (
    <div
      className={`flex gap-4 max-w-3xl mx-auto ${
        message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          message.type === 'user' ? 'bg-blue-900' : 'bg-purple-900'
        }`}
      >
        {message.type === 'user' ? (
          <User className="w-4 h-4 text-blue-300" />
        ) : (
          <Bot className="w-4 h-4 text-purple-300" />
        )}
      </div>
      <div
        className={`flex-1 ${
          message.type === 'user' ? 'text-right' : 'text-left'
        }`}
      >
        {typeof message.content === 'string' ? (
          <div className="space-y-2">
            <div 
              className={`inline-block max-w-[80%] px-4 py-2 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-100'
              }`}
            >
              {message.content}
            </div>
            {message.files && message.files.length > 0 && (
              <div className="flex gap-2 justify-end">
                {message.files.map((file, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{file.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <MappingResult mapping={message.content} onApprove={onApprove} />
        )}
      </div>
    </div>
  );
}