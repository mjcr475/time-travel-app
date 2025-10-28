import React, { useState } from 'react';

interface ApiKeyManagerProps {
  onKeySave: (key: string) => void;
}

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onKeySave }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSave = () => {
    if (apiKey.trim()) {
      onKeySave(apiKey.trim());
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Enter Your API Key</h2>
      <p className="text-gray-600 mb-6">
        To use the Time-Travel Booth, please provide your Google AI Studio API key.
        Your key is stored securely in your browser's session and is never shared.
      </p>
      <input
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Enter your Gemini API key"
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <button
        onClick={handleSave}
        disabled={!apiKey.trim()}
        className="mt-4 w-full px-5 py-3 bg-purple-500 text-white font-bold rounded-xl shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Save and Start Traveling
      </button>
      <a
        href="https://aistudio.google.com/app/apikey"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-sm text-purple-600 hover:underline"
      >
        Get your API key from Google AI Studio
      </a>
    </div>
  );
};
