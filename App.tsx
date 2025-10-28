import React, { useState, useCallback, useMemo } from 'react';
import { PortraitCreator } from './components/PortraitCreator';
import { SceneSelector } from './components/SceneSelector';
import { ResultDisplay } from './components/ResultDisplay';
import { Spinner } from './components/Spinner';
import { analyzeImageForFace, generateTimeTravelImage, generatePortraitFromPrompt, generateRandomScenes, generateRandomPortrait } from './services/geminiService';
import { HISTORICAL_SCENES } from './constants';
import type { AppState, HistoricalScene } from './types';
import { LogoIcon } from './components/icons';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('CHOOSING_METHOD');
  const [userImage, setUserImage] = useState<{ base64: string; type: string } | null>(null);
  const [selectedScene, setSelectedScene] = useState<HistoricalScene | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [batchResultImages, setBatchResultImages] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [displayedScenes, setDisplayedScenes] = useState<HistoricalScene[]>(HISTORICAL_SCENES);


  const processAndAnalyzeImage = useCallback(async (imageData: { base64: string; type: string }) => {
    setError(null);
    setUserImage(imageData);
    setAppState('ANALYZING');
    try {
      const hasFace = await analyzeImageForFace(imageData.base64, imageData.type);
      if (hasFace) {
        setAppState('SELECTING_SCENE');
      } else {
        setError('No clear face detected. Please try a clear, front-facing portrait!');
        setAppState('CHOOSING_METHOD');
        setUserImage(null);
      }
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred during image analysis.');
      }
      setAppState('CHOOSING_METHOD');
      setUserImage(null);
    }
  }, []);

  const handleGenerateFromPrompt = useCallback(async (prompt: string) => {
    setError(null);
    setAppState('GENERATING_PORTRAIT');
    try {
      const generatedPortraitBase64 = await generatePortraitFromPrompt(prompt);
      if (generatedPortraitBase64) {
        await processAndAnalyzeImage({ base64: generatedPortraitBase64, type: 'image/jpeg' });
      } else {
        throw new Error("AI portrait generation failed to return data.");
      }
    } catch (e) {
       console.error(e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred while generating the portrait.');
      }
      setAppState('CHOOSING_METHOD');
    }
  }, [processAndAnalyzeImage]);

  const handleGenerateRandomPortrait = useCallback(async () => {
    setError(null);
    setAppState('GENERATING_PORTRAIT');
    try {
        const generatedPortraitBase64 = await generateRandomPortrait();
        if (generatedPortraitBase64) {
            await processAndAnalyzeImage({ base64: generatedPortraitBase64, type: 'image/jpeg' });
        } else {
            throw new Error("AI portrait generation failed to return data.");
        }
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError('An unknown error occurred while generating the random portrait.');
        }
        setAppState('CHOOSING_METHOD');
    }
  }, [processAndAnalyzeImage]);


  const handleGenerateScenes = useCallback(async () => {
    setError(null);
    setAppState('GENERATING_SCENES');
    try {
      const newScenes = await generateRandomScenes();
      setDisplayedScenes(newScenes);
      setAppState('SELECTING_SCENE');
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred while generating new scenes.');
      }
      setAppState('SELECTING_SCENE'); // Go back to scene selection even on error
    }
  }, []);
  
  const handleGenerateBatch = useCallback(async () => {
    if (!userImage) return;
    setError(null);
    setAppState('GENERATING_BATCH');
    try {
      const newScenes = await generateRandomScenes();
      
      const imagePromises = newScenes.map(scene => 
        generateTimeTravelImage(userImage.base64, userImage.type, scene.prompt)
      );
      
      const results = await Promise.all(imagePromises);
      const successfulResults = results
        .filter((img): img is string => img !== null)
        .map(base64 => `data:image/jpeg;base64,${base64}`);

      if (successfulResults.length === 0) {
        throw new Error("Batch generation failed to produce any images.");
      }

      setBatchResultImages(successfulResults);
      setAppState('SHOWING_BATCH_RESULT');
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred during batch generation.');
      }
      setAppState('SELECTING_SCENE');
    }
  }, [userImage]);


  const handleSceneSelect = useCallback(async (scene: HistoricalScene) => {
    if (!userImage) return;
    setError(null);
    setSelectedScene(scene);
    setAppState('GENERATING');
    try {
      const resultImage = await generateTimeTravelImage(userImage.base64, userImage.type, scene.prompt);
      if (resultImage) {
        setGeneratedImage(`data:image/jpeg;base64,${resultImage}`);
        setAppState('SHOWING_RESULT');
      } else {
        throw new Error("Image generation failed to return data.");
      }
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred while generating the image.');
      }
      setAppState('SELECTING_SCENE');
    }
  }, [userImage]);

  const handleReset = useCallback(() => {
    setAppState('CHOOSING_METHOD');
    setUserImage(null);
    setSelectedScene(null);
    setGeneratedImage(null);
    setBatchResultImages(null);
    setError(null);
    setDisplayedScenes(HISTORICAL_SCENES);
  }, []);

  const currentTitle = useMemo(() => {
    switch (appState) {
      case 'CHOOSING_METHOD': return 'Create Your Portrait';
      case 'GENERATING_PORTRAIT': return 'Crafting Your AI Portrait...';
      case 'ANALYZING': return 'Checking your lovely photo...';
      case 'SELECTING_SCENE': return 'Choose Your Destination';
      case 'GENERATING_SCENES': return 'Discovering New Adventures...';
      case 'GENERATING': return 'Traveling Through Time...';
      case 'GENERATING_BATCH': return 'Embarking on a Grand Tour...';
      case 'SHOWING_RESULT': return 'Welcome to the Past!';
      case 'SHOWING_BATCH_RESULT': return 'Your Adventures Across Time!';
      default: return 'Gemini Time-Travel Booth';
    }
  }, [appState]);
  
  const loadingMessages = [
    "Warming up the time machine...",
    "Polishing the portal lens...",
    "Knitting pixels through time...",
    "Chatting with historical experts...",
    "Making sure you don't step on any butterflies...",
  ];
  
  const portraitLoadingMessages = [
    "Warming up the AI easel...",
    "Mixing digital paints...",
    "Sketching your likeness...",
    "Adding a dash of magic...",
    "Voila! Your masterpiece...",
  ];
  
  const sceneLoadingMessages = [
      "Dreaming up new places...",
      "Building worlds with pixels...",
      "Consulting the map of imagination...",
      "Generating fantastical destinations...",
  ];
  
  const batchLoadingMessages = [
    "Packing your bags for a big trip...",
    "Opening multiple time portals at once...",
    "Creating a whole album of memories...",
    "This might take a moment, great adventures await!",
  ];


  const renderContent = () => {
    switch (appState) {
      case 'CHOOSING_METHOD':
        return <PortraitCreator onImageUpload={processAndAnalyzeImage} onGenerate={handleGenerateFromPrompt} onGenerateRandom={handleGenerateRandomPortrait} error={error} />;
      case 'GENERATING_PORTRAIT':
        return <Spinner messages={portraitLoadingMessages} />;
      case 'ANALYZING':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            {userImage && <img src={`data:${userImage.type};base64,${userImage.base64}`} alt="Uploaded portrait" className="w-48 h-48 rounded-2xl object-cover mb-4 shadow-lg" />}
            <Spinner />
          </div>
        );
      case 'SELECTING_SCENE':
        return <SceneSelector userImage={userImage} scenes={displayedScenes} onSceneSelect={handleSceneSelect} onGenerateScenes={handleGenerateScenes} onGenerateBatch={handleGenerateBatch} />;
      case 'GENERATING_SCENES':
        return <Spinner messages={sceneLoadingMessages} />;
      case 'GENERATING_BATCH':
        return <Spinner messages={batchLoadingMessages} />;
      case 'GENERATING':
        return (
            <div className="flex flex-col items-center justify-center text-center">
                <div className="flex items-center justify-center space-x-4 mb-6">
                    {userImage && <img src={`data:${userImage.type};base64,${userImage.base64}`} alt="User portrait" className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover shadow-lg" />}
                    {selectedScene && <img src={selectedScene.imageUrl} alt={selectedScene.name} className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover shadow-lg" />}
                </div>
                <Spinner messages={loadingMessages} />
            </div>
        );
      case 'SHOWING_RESULT':
        return <ResultDisplay generatedImage={generatedImage} onReset={handleReset} />;
      case 'SHOWING_BATCH_RESULT':
        return <ResultDisplay batchImages={batchResultImages} onReset={handleReset} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-5xl mx-auto">
        <header className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <LogoIcon />
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800">
              Time-Travel Booth
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-500 font-medium">{currentTitle}</p>
        </header>
        <main className="bg-white/70 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-2xl shadow-purple-200/50 min-h-[450px] flex items-center justify-center">
          {renderContent()}
        </main>
        <footer className="text-center mt-8 text-gray-500">
          <p>Powered by Google Gemini. Have fun creating moments out of time!</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
