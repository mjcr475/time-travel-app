import React from 'react';
import { UploadIcon, MagicWandIcon, DiceIcon } from './icons';
import { ImageUploader } from './ImageUploader';

interface PortraitCreatorProps {
  onImageUpload: (imageData: { base64: string, type: string }) => void;
  onGenerate: (prompt: string) => void;
  onGenerateRandom: () => void;
  error: string | null;
}

export const PortraitCreator: React.FC<PortraitCreatorProps> = ({ onImageUpload, onGenerate, onGenerateRandom, error }) => {
  const [mode, setMode] = React.useState<'choice' | 'upload' | 'generate'>('choice');
  const [prompt, setPrompt] = React.useState('');

  const handleGenerateClick = () => { if (prompt.trim()) onGenerate(prompt.trim()); };

  const renderContent = () => {
    switch (mode) {
      case 'upload':
        return <ImageUploader onImageUpload={onImageUpload} onBack={() => setMode('choice')} />;
      case 'generate':
        return (
          <div className="w-full max-w-md">
            <p className="text-center text-gray-500 mb-4">Describe the portrait you want to create. Be creative!</p>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., a friendly pirate with a parrot, a scientist from the future..."
              className="w-full h-24 p-3 bg-white border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGenerateClick}
                disabled={!prompt.trim()}
                className="flex-1 flex items-center justify-center px-5 py-3 bg-pink-500 text-white font-bold rounded-xl shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <MagicWandIcon className="mr-2" />
                Generate
              </button>
              <button
                onClick={onGenerateRandom}
                className="sm:flex-initial flex items-center justify-center px-5 py-3 bg-purple-500 text-white font-bold rounded-xl shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
              >
                <DiceIcon className="mr-2" />
                Surprise Me!
              </button>
            </div>
            <button onClick={() => setMode('choice')} className="mt-4 text-sm text-gray-500 hover:text-gray-700">← Back</button>
          </div>
        );
      case 'choice':
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            <button onClick={() => setMode('upload')} className="group flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300">
              <UploadIcon className="h-16 w-16 text-purple-500" />
              <h3 className="mt-4 text-2xl font-bold text-gray-800">Upload Photo</h3>
              <p className="mt-1 text-gray-500">Use your own picture</p>
            </button>
            <button onClick={() => setMode('generate')} className="group flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300">
              <MagicWandIcon className="h-16 w-16 text-pink-500" />
              <h3 className="mt-4 text-2xl font-bold text-gray-800">Generate with AI</h3>
              <p className="mt-1 text-gray-500">Create a new portrait</p>
            </button>
          </div>
        );
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {renderContent()}
      {error && <p className="mt-6 text-red-500 font-bold text-center">{error}</p>}
    </div>
  );
};
