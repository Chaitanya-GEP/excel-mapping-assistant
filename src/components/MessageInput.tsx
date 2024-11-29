import React, { useState, useRef } from 'react';
import { Paperclip, Send, AlertCircle } from 'lucide-react';
import { MessageInputProps } from '../types/mapping';
import { validateFile } from '../utils/fileValidation';
import { clsx } from 'clsx';

const MAX_CHARS = 500;

export function MessageInput({ onSend, isProcessing }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || files.length > 0) {
      onSend(message, files);
      setMessage('');
      setFiles([]);
      setError(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles: File[] = [];
    let errorMessage: string | null = null;

    for (const file of selectedFiles) {
      const validation = validateFile(file);
      if (validation.isValid) {
        validFiles.push(file);
      } else {
        errorMessage = validation.error;
        break;
      }
    }

    if (errorMessage) {
      setError(errorMessage);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      setFiles((prev) => [...prev, ...validFiles]);
      setError(null);
    }
  };

  const charCount = message.length;
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-lg p-4">
      {error && (
        <div className="mb-3 flex items-center gap-2 text-red-400 bg-red-900/20 p-2 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {files.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 text-gray-200"
            >
              <span>{file.name}</span>
              <button
                type="button"
                onClick={() => {
                  setFiles(files.filter((_, i) => i !== index));
                  if (files.length === 1) {
                    setError(null);
                  }
                }}
                className="text-gray-400 hover:text-red-400"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className={clsx(
              "flex-1 px-4 py-2 border bg-gray-700 text-gray-100 border-gray-600 rounded-full focus:outline-none focus:border-blue-500",
              isOverLimit && "border-red-500"
            )}
            disabled={isProcessing}
            maxLength={MAX_CHARS}
          />
          
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-400 hover:text-blue-400 transition-colors rounded-full hover:bg-gray-700"
              disabled={isProcessing}
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            <button
              type="submit"
              className={clsx(
                "p-2 rounded-full",
                isProcessing || isOverLimit
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              )}
              disabled={isProcessing || isOverLimit}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className={clsx(
          "text-right text-sm",
          isOverLimit ? "text-red-400" : "text-gray-400"
        )}>
          {charCount}/{MAX_CHARS} characters
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileSelect}
        className="hidden"
        multiple
      />
    </form>
  );
}