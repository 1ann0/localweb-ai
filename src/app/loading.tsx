export default function Loading() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="noise-bg" />
            <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                <p className="text-gray-400 text-sm font-medium">Loading...</p>
            </div>
        </div>
    );
}
