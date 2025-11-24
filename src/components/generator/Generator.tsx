"use client";

import React, { useState } from 'react';
import { BusinessData } from '@/types/business';
import { Hero } from './templates/Hero';
import { ServiceList } from './templates/ServiceList';
import { Footer } from './templates/Footer';
import { Bot, Upload, Play, Save, LogIn, ArrowLeft, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { saveSite } from '@/lib/db';

// Initial mock data
const INITIAL_DATA: BusinessData = {
    businessName: "LocalWeb AI",
    heroHeadline: "Your Business Online in 60 Seconds",
    heroSubheadline: "Upload a flyer or menu, and our AI will build you a professional, mobile-friendly website instantly.",
    primaryColor: "#6366f1",
    services: [],
    contact: {
        phone: "555-0123"
    }
};

export default function Generator() {
    const [data, setData] = useState<BusinessData>(INITIAL_DATA);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const { user, signInWithGoogle } = useAuth();

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/parse-file', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const newData = await response.json();
            setData(newData);
        } catch (error) {
            console.error(error);
            alert('Failed to process file. Please try again.');
        } finally {
            setIsLoading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleGenerate = async () => {
        if (!input) return;

        setIsLoading(true);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: input }),
            });

            if (!response.ok) throw new Error('Generation failed');

            const newData = await response.json();
            setData(newData);
        } catch (error) {
            console.error(error);
            alert('Failed to generate site. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!user) {
            setIsLoggingIn(true);
            try {
                await signInWithGoogle();
            } catch (error) {
                console.error("Login failed", error);
            } finally {
                setIsLoggingIn(false);
            }
            return;
        }

        setIsSaving(true);
        try {
            await saveSite(user.uid, data);
            alert('Site saved successfully!');
        } catch (error) {
            console.error("Error saving site:", error);
            alert('Failed to save site. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex h-screen bg-background overflow-hidden font-sans text-foreground">
            <div className="noise-bg" />

            {/* Left Sidebar: Controls */}
            <div className="w-[400px] glass-panel border-r border-border flex flex-col z-10 relative">
                <div className="p-6 border-b border-border flex justify-between items-center bg-white/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-lg text-primary shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                            <Bot size={20} />
                        </div>
                        <span className="font-display font-bold text-white text-lg tracking-tight">LocalWeb AI</span>
                    </div>
                    {user && (
                        <a href="/dashboard" className="text-xs font-medium text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5">
                            My Sites
                        </a>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Quick Actions */}
                    <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quick Actions</label>
                        <div className="flex gap-3">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                className="hidden"
                                accept=".pdf,.jpg,.jpeg,.png"
                            />
                            <button
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all group"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isLoading}
                            >
                                <div className="p-1.5 bg-white/5 rounded-md group-hover:bg-white/10 transition-colors">
                                    <Upload size={16} className="text-gray-400 group-hover:text-white" />
                                </div>
                                {isLoading ? 'Uploading...' : 'Upload File'}
                            </button>
                        </div>

                        <button
                            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all shadow-lg ${user
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/30'
                                : 'bg-primary text-white hover:bg-primary-hover hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)]'
                                }`}
                            onClick={handleSave}
                            disabled={isSaving || isLoggingIn}
                        >
                            {user ? (
                                <>
                                    <Save size={16} />
                                    {isSaving ? 'Saving...' : 'Save Site'}
                                </>
                            ) : (
                                <>
                                    <LogIn size={16} />
                                    {isLoggingIn ? 'Signing in...' : 'Sign in to Save'}
                                </>
                            )}
                        </button>
                    </div>

                    {/* Chat Interface */}
                    <div className="space-y-4 h-full flex flex-col">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                            <Sparkles size={12} className="text-accent-pink" />
                            AI Assistant
                        </label>
                        <div className="flex-1 bg-black/20 border border-white/10 rounded-2xl shadow-inner p-4 flex flex-col focus-within:ring-1 focus-within:ring-primary/50 focus-within:border-primary/50 transition-all">
                            <textarea
                                className="flex-1 w-full resize-none border-none focus:ring-0 p-0 text-sm text-gray-200 placeholder-gray-600 bg-transparent leading-relaxed"
                                placeholder="Describe your business, services, and style preferences..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-4">
                                <span className="text-xs text-gray-600">Press Enter to generate</span>
                                <button
                                    className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-all hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                                    onClick={handleGenerate}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span>Generating...</span>
                                    ) : (
                                        <>
                                            <Play size={14} className="fill-current" />
                                            Generate
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-white/5 bg-black/20">
                    <p className="text-xs text-center text-gray-600 font-medium">
                        Powered by Gemini 1.5 Pro
                    </p>
                </div>
            </div>

            {/* Right Area: Preview */}
            <div className="flex-1 bg-black/40 p-8 overflow-hidden relative flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

                {/* Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="w-full h-full max-w-6xl flex flex-col relative z-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    {/* Browser Chrome */}
                    <div className="bg-[#1E1E2E] rounded-t-xl p-3 flex items-center gap-4 shadow-2xl border border-white/5 border-b-0">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                        </div>
                        <div className="flex-1 bg-black/30 rounded-md px-4 py-1.5 text-xs text-gray-400 font-mono text-center flex items-center justify-center gap-2 border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            {data.businessName.toLowerCase().replace(/\s+/g, '-')}.com
                        </div>
                        <div className="w-16"></div> {/* Spacer for centering */}
                    </div>

                    {/* Website Content */}
                    <div className="flex-1 bg-background rounded-b-xl shadow-2xl overflow-y-auto scrollbar-hide border border-white/5 border-t-0 relative">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                        <div className="website-content relative z-10">
                            <Hero data={data} />
                            <ServiceList data={data} />
                            <Footer data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
