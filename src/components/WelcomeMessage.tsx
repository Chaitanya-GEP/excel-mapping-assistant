import React from 'react';
import { Bot } from 'lucide-react';

export function WelcomeMessage() {
  return (
    <div className="flex gap-4 max-w-3xl mx-auto mb-6">
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-900">
        <Bot className="w-4 h-4 text-purple-300" />
      </div>
      <div className="flex-1 bg-gray-800 shadow-lg rounded-lg p-4">
        <h2 className="font-semibold text-lg mb-2 text-gray-100">Welcome to Excel Mapping Assistant! 👋</h2>
        <p className="text-gray-300 mb-3">
          I'm here to help you map your Excel data to the database properties. Here's what you can do:
        </p>
        <ul className="space-y-2 text-gray-300">
          <li>📎 Upload one or multiple Excel files</li>
          <li>💬 Send messages to interact with me</li>
          <li>✅ Review and approve column mappings</li>
          <li>🔄 Start a new chat anytime</li>
        </ul>
      </div>
    </div>
  );
}