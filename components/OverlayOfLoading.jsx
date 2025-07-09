"use client";

import { useEffect, useState } from 'react';

const OverlayOfLoading = ({
    isLoading = true,
    message = 'Loading...',
    spinnerColor = 'text-blue-400', // Brighter color for dark mode
    textColor = 'text-gray-100',    // Lighter text for dark mode
    backdropBlur = true,
    darkMode = true                 // Enable dark mode by default
}) => {
    const [show, setShow] = useState(false);

    // Add a small delay to prevent flash of loading state
    useEffect(() => {
        if (isLoading) {
            setShow(true);
        } else {
            const timer = setTimeout(() => setShow(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (!show) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
            {/* Backdrop */}
            <div className={`absolute inset-0 bg-black/30 ${backdropBlur ? 'backdrop-blur-sm' : ''}`}></div>

            {/* Spinner and Message */}
            <div className={`relative z-10 flex flex-col items-center justify-center p-6 rounded-lg shadow-xl w-64 h-48 ${darkMode
                    ? 'bg-gray-800 text-white'
                    : 'bg-white text-gray-800'
                }`}>
                {/* Spinner */}
                <div className={`w-12 h-12 mb-4 ${spinnerColor}`}>
                    <svg className="w-full h-full animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </div>

                {/* Message */}
                {message && (
                    <p className={`text-center font-medium ${textColor}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default OverlayOfLoading;