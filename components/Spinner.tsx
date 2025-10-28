import React, { useState, useEffect } from 'react';
import { SparklesIcon } from './icons';

interface SpinnerProps {
    messages?: string[];
}

export const Spinner: React.FC<SpinnerProps> = ({ messages }) => {
    const [currentMessage, setCurrentMessage] = useState<string | undefined>(messages?.[0]);

    useEffect(() => {
        if (messages && messages.length > 1) {
            const intervalId = setInterval(() => {
                setCurrentMessage(prev => {
                    const currentIndex = messages.indexOf(prev || '');
                    const nextIndex = (currentIndex + 1) % messages.length;
                    return messages[nextIndex];
                });
            }, 2500);

            return () => clearInterval(intervalId);
        }
    }, [messages]);

    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="animate-spin text-pink-400">
                <SparklesIcon className="w-16 h-16" />
            </div>
            {currentMessage && <p className="mt-4 text-lg font-semibold text-gray-600 max-w-xs">{currentMessage}</p>}
        </div>
    );
};
