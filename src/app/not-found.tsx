import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
            <div className="noise-bg" />
            <div className="text-center relative z-10 max-w-md">
                <div className="text-8xl font-display font-bold text-gradient-primary mb-4">
                    404
                </div>
                <h1 className="text-2xl font-display font-bold text-white mb-4">
                    Page Not Found
                </h1>
                <p className="text-gray-400 mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-hover transition-all hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)]"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
