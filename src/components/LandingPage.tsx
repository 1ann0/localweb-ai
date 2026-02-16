import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Shield, Globe, Upload, Sparkles, Rocket, Check } from 'lucide-react';

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
                        LocalWeb<span className="text-primary">AI</span>
                    </span>
                    <div className="flex items-center gap-8">
                        <a href="#pricing" className="hidden sm:block text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            Pricing
                        </a>
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
                        AI-Powered Websites for Local Businesses
                    </div>

                    <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
                        <span className="block animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>Your Business</span>
                        <span className="block text-gradient-primary animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>Online in Seconds.</span>
                    </h1>

                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
                        Upload a flyer, menu, or business card. Our AI builds you a stunning,
                        mobile-friendly website instantly. No coding required.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up opacity-0" style={{ animationDelay: '0.5s' }}>
                        <button
                            onClick={onGetStarted}
                            className="group relative px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-full font-bold transition-all hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)]"
                        >
                            Start Building Free
                            <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-primary text-sm font-bold uppercase tracking-wider">How It Works</span>
                        <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4">
                            Three Steps to Your Website
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting line */}
                        <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                        {[
                            {
                                step: "01",
                                icon: Upload,
                                title: "Upload Your Content",
                                desc: "Drop in a flyer, menu, business card, or just describe your business in chat."
                            },
                            {
                                step: "02",
                                icon: Sparkles,
                                title: "AI Generates Your Site",
                                desc: "Our AI extracts key info and builds a professional website in seconds."
                            },
                            {
                                step: "03",
                                icon: Rocket,
                                title: "Publish & Go Live",
                                desc: "Review, customize if needed, and publish your site with one click."
                            }
                        ].map((item, i) => (
                            <div key={i} className="relative text-center group">
                                <div className="w-32 h-32 mx-auto mb-6 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
                                        {item.step}
                                    </div>
                                    <item.icon className="w-12 h-12 text-primary" />
                                </div>
                                <h3 className="font-display text-xl font-bold mb-3 text-white">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-accent-pink text-sm font-bold uppercase tracking-wider">Features</span>
                        <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4">
                            Built for Local Success
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Zap,
                                title: "Instant Generation",
                                desc: "From upload to live website in under 60 seconds. No waiting, no hassle."
                            },
                            {
                                icon: Shield,
                                title: "Mobile-First Design",
                                desc: "Every site looks stunning on phones, tablets, and desktops. Guaranteed."
                            },
                            {
                                icon: Globe,
                                title: "Local SEO Ready",
                                desc: "Optimized for Google Maps and local search. Get found by customers nearby."
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

            {/* Early Adopter CTA (replaces fake testimonials) */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

                <div className="max-w-3xl mx-auto relative z-10 text-center">
                    <span className="text-primary text-sm font-bold uppercase tracking-wider">Early Access</span>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-6">
                        Be One of Our First Users
                    </h2>
                    <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                        LocalWebAI is brand new and we&apos;re looking for local businesses to try it out.
                        Get started free and help shape the future of AI-powered websites.
                    </p>
                    <button
                        onClick={onGetStarted}
                        className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-full font-bold transition-all hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)]"
                    >
                        Try It Free
                    </button>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-accent-pink text-sm font-bold uppercase tracking-wider">Pricing</span>
                        <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
                            Start free, upgrade when you&apos;re ready. No hidden fees.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                name: "Free",
                                price: "$0",
                                period: "forever",
                                desc: "Perfect for trying out",
                                features: [
                                    "1 website",
                                    "AI generation",
                                    "Mobile-friendly design",
                                    "LocalWebAI subdomain"
                                ],
                                cta: "Get Started",
                                popular: false
                            },
                            {
                                name: "Pro",
                                price: "$19",
                                period: "/month",
                                desc: "For growing businesses",
                                features: [
                                    "5 websites",
                                    "Custom domain",
                                    "Remove branding",
                                    "Priority support",
                                    "Analytics dashboard"
                                ],
                                cta: "Start Pro Trial",
                                popular: true
                            },
                            {
                                name: "Business",
                                price: "$49",
                                period: "/month",
                                desc: "For agencies & power users",
                                features: [
                                    "Unlimited websites",
                                    "White-label solution",
                                    "API access",
                                    "Dedicated support",
                                    "Team collaboration"
                                ],
                                cta: "Contact Sales",
                                popular: false
                            }
                        ].map((plan, i) => (
                            <div key={i} className={`relative glass-panel p-8 rounded-2xl ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full text-xs font-bold text-white">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="font-display text-xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-gray-500 text-sm mb-4">{plan.desc}</p>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-gray-500">{plan.period}</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, j) => (
                                        <li key={j} className="flex items-center gap-3 text-gray-300">
                                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={onGetStarted}
                                    className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular
                                            ? 'bg-primary text-white hover:bg-primary-hover'
                                            : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                                        }`}
                                >
                                    {plan.cta}
                                </button>
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
                        Ready to Go Online?
                    </h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Get your business online in seconds with AI-powered website generation.
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
                        LocalWeb<span className="text-primary/50">AI</span> &copy; {new Date().getFullYear()}
                    </span>
                </div>
            </footer>
        </div>
    );
}
