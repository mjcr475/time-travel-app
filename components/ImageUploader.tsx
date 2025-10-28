import React, { useState, useCallback } from 'react';
import { fileToGenerativePart } from '../utils/fileUtils';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (imageData: { base64: string; type: string }) => void;
  onBack: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, onBack }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback(async (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      try {
        const imageData = await fileToGenerativePart(file);
        onImageUpload(imageData);
      } catch (e) {
        console.error("Error processing file:", e);
      }
    }
  }, [onImageUpload]);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileChange(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <label
        htmlFor="image-upload"
        className={`relative block w-full border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors duration-300 ${isDragging ? 'border-pink-400 bg-pink-50' : 'border-gray-300 hover:border-pink-400 hover:bg-white'}`}
        onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={onDragOver} onDrop={onDrop}
      >
        <div className="flex flex-col items-center justify-center text-gray-500">
          <UploadIcon className="h-12 w-12" />
          <p className="mt-4 text-lg font-bold">Drop your photo here!</p>
          <p>or click to browse</p>
        </div>
        <input id="image-upload" type="file" accept="image/*" className="sr-only" onChange={onFileInputChange} />
      </label>
      <button onClick={onBack} className="mt-4 text-sm text-gray-500 hover:text-gray-700">← Back</button>
    </div>
  );
};
