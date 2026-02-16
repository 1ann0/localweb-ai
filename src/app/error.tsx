"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
            <div className="noise-bg" />
            <div className="text-center relative z-10 max-w-md">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
                    <span className="text-4xl">!</span>
                </div>
                <h1 className="text-2xl font-display font-bold text-white mb-4">
                    Something went wrong
                </h1>
                <p className="text-gray-400 mb-8">
                    An unexpected error occurred. Please try again.
                </p>
                <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-hover transition-all hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)]"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
