import React from 'react';
import { RefreshIcon, DownloadIcon } from './icons';

interface ResultDisplayProps {
  generatedImage?: string | null;
  batchImages?: string[] | null;
  onReset: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ generatedImage, batchImages, onReset }) => {
  const handleDownload = (base64Data: string, filename: string) => {
    const link = document.createElement('a');
    link.href = base64Data;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderContent = () => {
    if (batchImages && batchImages.length > 0) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {batchImages.map((src, index) => (
            <div key={index} className="relative group aspect-square">
              <img
                src={src}
                alt={`Generated time-travel scene ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
              <button
                onClick={() => handleDownload(src, `gemini-time-travel-${index + 1}.jpg`)}
                className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white hover:scale-110 transition-all duration-200"
                aria-label={`Download image ${index + 1}`}
              >
                <DownloadIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      );
    }

    if (generatedImage) {
      return (
        <div className="relative mb-8">
            <img
            src={generatedImage}
            alt="Generated time-travel"
            className="max-w-full max-h-[60vh] rounded-2xl shadow-2xl"
            />
            <button
                onClick={() => handleDownload(generatedImage, 'gemini-time-travel-scene.jpg')}
                className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white hover:scale-110 transition-all duration-200"
                aria-label="Download image"
            >
                <DownloadIcon className="h-6 w-6" />
            </button>
        </div>
      );
    }

    return <p>No image generated.</p>;
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {renderContent()}
      <button
        onClick={onReset}
        className="flex items-center justify-center px-6 py-3 bg-purple-500 text-white font-bold rounded-xl shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
      >
        <RefreshIcon />
        <span className="ml-2">Travel Again</span>
      </button>
    </div>
  );
};
