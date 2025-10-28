import React from 'react';

export const UploadIcon: React.FC<{className?: string}> = ({ className = "h-12 w-12 text-gray-500" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 12v9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-3-3-3 3" />
    </svg>
);

export const RefreshIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M20 4h-5v5M4 20h5v-5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l1.5 1.5M20 20l-1.5-1.5M20 4l-1.5 1.5M4 20l1.5-1.5" />
    </svg>
);

export const MagicWandIcon: React.FC<{className?: string}> = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c.83 0 1.5-.67 1.5-1.5S12.83 8 12 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.29 5.29l-1.42 1.42C19.98 6.59 20 6.4 20 6c0-2.21-1.79-4-4-4-.4 0-.79.02-1.17.06l1.42-1.42c.39-.39.39-1.02 0-1.41a.996.996 0 00-1.41 0l-1.42 1.42C13.04 1.26 12.53 1 12 1s-1.04.26-1.41.64L9.17 3.06C8.79 3.02 8.4 3 8 3c-2.21 0-4 1.79-4 4 0 .4.02.79.06 1.17L2.64 9.59c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.42-1.42C5.86 9.88 6.38 10 7 10s1.14-.12 1.52-.35l1.42 1.42c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-1.42-1.42C9.88 8.14 10 7.62 10 7s-.12-1.14-.35-1.52l1.42-1.42c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41l-1.42 1.42c.23.38.35.8.35 1.23 0 1.04-.39 1.98-1 2.65l3.54 3.54c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41L12.65 11c.67-.61 1.05-1.56 1.05-2.58 0-.43-.07-.84-.2-1.23l1.42-1.42c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-1.42 1.42c.23.38.35.8.35 1.23 0 1.04-.39 1.98-1 2.65l4.24 4.24c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41L15.3 12.7c.67-.61 1.05-1.56 1.05-2.58 0-.43-.07-.84-.2-1.23l1.42-1.42c.39-.39 1.02-.39 1.41 0 .39.39.39-1.02 0-1.41z" />
    </svg>
);


export const DiceIcon: React.FC<{className?: string}> = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V9h2v3zm4 4h-2v-2h2v2zm0-4h-2V9h2v3z"/>
    </svg>
);

export const SparklesIcon: React.FC<{className?: string}> = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M19 3v4M17 5h4M12 3v4M10 5h4M5 19v2M3 20h4M19 19v2M17 20h4M12 19v2M10 20h4M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
    </svg>
);


export const LogoIcon: React.FC = () => (
    <svg className="w-12 h-12 text-pink-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 5c.83 0 1.5.67 1.5 1.5S11.33 10 10.5 10 9 9.33 9 8.5 9.67 7 10.5 7zm3 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM12 14c-2.33 0-4.32 1.46-5.12 3.5h10.24c-.8-2.04-2.79-3.5-5.12-3.5z" />
    </svg>
);

export const DownloadIcon: React.FC<{className?: string}> = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);
