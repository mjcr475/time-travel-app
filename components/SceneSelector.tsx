import React from 'react';
import type { HistoricalScene } from '../types';
import { DiceIcon, SparklesIcon } from './icons';

interface SceneSelectorProps {
  userImage: { base64: string; type: string } | null;
  scenes: HistoricalScene[];
  onSceneSelect: (scene: HistoricalScene) => void;
  onGenerateScenes: () => void;
  onGenerateBatch: () => void;
}

export const SceneSelector: React.FC<SceneSelectorProps> = ({ userImage, scenes, onSceneSelect, onGenerateScenes, onGenerateBatch }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold mb-3 text-gray-700">Your Portrait</h3>
            {userImage && (
                <img
                    src={`data:${userImage.type};base64,${userImage.base64}`}
                    alt="User portrait"
                    className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-white mb-6"
                />
            )}
             <div className="w-full space-y-3">
                <button
                  onClick={onGenerateBatch}
                  className="w-full flex items-center justify-center px-4 py-3 bg-pink-500 text-white font-bold rounded-xl shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
                >
                  <SparklesIcon className="mr-2" />
                  Generate All!
                </button>
                <button
                  onClick={onGenerateScenes}
                  className="w-full flex items-center justify-center px-4 py-3 bg-purple-500 text-white font-bold rounded-xl shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                >
                  <DiceIcon className="mr-2" />
                  New Scenes
                </button>
            </div>
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {scenes.map((scene) => (
              <button
                key={scene.id}
                onClick={() => onSceneSelect(scene)}
                className="group relative aspect-square block w-full overflow-hidden rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={scene.imageUrl}
                  alt={scene.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 flex items-end justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/80 backdrop-blur-sm text-gray-800 font-bold text-sm px-3 py-1 rounded-full">
                    {scene.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
