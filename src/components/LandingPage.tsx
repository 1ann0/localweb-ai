import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Shield, Globe, Play } from 'lucide-react';
import Link from 'next/link';

interface LandingPageProps {
    onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary selection:text-white">
            <div className="noise-bg" />

            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <span className="font-display text-2xl font-bold tracking-tight text-white">
                        Antigravity
                    </span>
                    <div className="flex items-center gap-8">
                        <button
                            onClick={onGetStarted}
                            className="hidden sm:block text-sm font-medium text-gray-400 hover:text-white transition-colors"
                        >
                            Sign in
                        </button>
                        <button
                            onClick={onGetStarted}
                            className="text-sm font-bold px-6 py-2.5 bg-white text-black rounded-full hover:bg-gray-200 transition-all hover:scale-105"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 sm:pt-48 sm:pb-32 px-6">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
                    <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute top-40 right-10 w-[400px] h-[400px] bg-accent-pink/20 rounded-full blur-[100px]" />
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-sm font-medium text-gray-300 mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        v2.0 is now live
                    </div>

                    <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
                        <span className="block animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>Websites that</span>
                        <span className="block text-gradient-primary animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>defy gravity.</span>
                    </h1>

                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
                        Generate stunning, high-performance websites in seconds.
                        Powered by advanced AI, designed for the future.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up opacity-0" style={{ animationDelay: '0.5s' }}>
                        <button
                            onClick={onGetStarted}
                            className="group relative px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-full font-bold transition-all hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)]"
                        >
                            Start Building Free
                            <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-8 py-4 glass-panel hover:bg-white/5 text-white rounded-full font-medium transition-all flex items-center gap-2">
                            <Play className="w-4 h-4 fill-current" />
                            Watch Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Zap,
                                title: "Lightning Fast",
                                desc: "Built on the edge. Your sites load instantly, everywhere."
                            },
                            {
                                icon: Shield,
                                title: "Enterprise Secure",
                                desc: "Bank-grade security baked in. SSL, DDoS protection, and more."
                            },
                            {
                                icon: Globe,
                                title: "Global Scale",
                                desc: "Deploy to 35+ regions automatically. Go global in one click."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-display text-xl font-bold mb-3 text-white">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

                <div className="max-w-3xl mx-auto relative z-10">
                    <h2 className="font-display text-4xl sm:text-5xl font-bold mb-8">
                        Ready to launch?
                    </h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Join thousands of creators building the future of the web.
                    </p>
                    <button
                        onClick={onGetStarted}
                        className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform"
                    >
                        Get Started Now
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-border">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
                    <span className="font-display text-lg font-bold text-gray-500">
                        Antigravity © 2024
                    </span>
                    <div className="flex gap-8 text-sm text-gray-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
