import React from 'react';
import { PlusCircle } from 'lucide-react';

interface NewChatButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function NewChatButton({ onClick, disabled }: NewChatButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-lg shadow-sm border border-gray-600 transition-colors"
    >
      <PlusCircle className="w-5 h-5" />
      <span>New Chat</span>
    </button>
  );
}