"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserSites, deleteSite, Site } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { Loader2, ExternalLink, ArrowLeft, Plus, Globe, Trash2, LogOut } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function Dashboard() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const [sites, setSites] = useState<Site[]>([]);
    const [fetching, setFetching] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading, router]);

    useEffect(() => {
        const fetchSites = async () => {
            if (!user) return;

            try {
                const fetchedSites = await getUserSites(user.uid);
                setSites(fetchedSites);
            } catch {
                toast.error('Failed to load sites');
            } finally {
                setFetching(false);
            }
        };

        if (user) {
            fetchSites();
        }
    }, [user]);

    const handleDelete = async (e: React.MouseEvent, site: Site) => {
        e.preventDefault();
        e.stopPropagation();

        if (!confirm(`Delete "${site.businessName}"? This cannot be undone.`)) return;

        setDeletingId(site.id);
        try {
            await deleteSite(site.id);
            setSites((prev) => prev.filter((s) => s.id !== site.id));
            toast.success('Site deleted');
        } catch {
            toast.error('Failed to delete site');
        } finally {
            setDeletingId(null);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push('/');
        } catch {
            toast.error('Failed to sign out');
        }
    };

    if (loading || fetching) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="noise-bg" />
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="noise-bg" />

            {/* Header */}
            <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white" aria-label="Back to home">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="font-display text-xl font-bold text-white">My Sites</h1>
                            <p className="text-sm text-gray-500">Manage your generated websites</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {user && (
                            <div className="flex items-center gap-3">
                                <span className="hidden sm:block text-sm text-gray-400">
                                    {user.displayName || user.email}
                                </span>
                                {user.photoURL && (
                                    <img
                                        src={user.photoURL}
                                        alt=""
                                        className="w-8 h-8 rounded-full border border-white/10"
                                    />
                                )}
                                <button
                                    onClick={handleSignOut}
                                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
                                    aria-label="Sign out"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        )}
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full font-bold text-sm hover:bg-primary-hover transition-all hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)]"
                        >
                            <Plus size={16} />
                            Create New Site
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {sites.length === 0 ? (
                    <div className="text-center py-24 glass-panel rounded-2xl">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                            <Globe className="w-10 h-10 text-gray-500" />
                        </div>
                        <h2 className="text-2xl font-display font-bold text-white mb-3">No sites yet</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Create your first website with AI in seconds. Just upload a flyer or describe your business.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-hover transition-all hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)]"
                        >
                            <Plus size={18} />
                            Get Started
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sites.map((site) => (
                            <Link
                                key={site.id}
                                href={`/site/${site.id}`}
                                className="glass-panel rounded-2xl overflow-hidden hover:bg-white/5 transition-all group block"
                            >
                                {/* Preview Header */}
                                <div className="h-40 bg-gradient-to-br from-primary/20 via-accent-pink/10 to-transparent flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 noise-overlay opacity-30" />
                                    <div className="relative z-10 text-center">
                                        <div className="w-14 h-14 mx-auto mb-2 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Globe className="w-7 h-7 text-primary" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-lg font-display font-bold text-white mb-2 truncate">
                                        {site.businessName}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                        {site.heroHeadline}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-border">
                                        <span className="text-xs text-gray-600">
                                            {new Date(site.createdAt).toLocaleDateString()}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => handleDelete(e, site)}
                                                disabled={deletingId === site.id}
                                                className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                aria-label={`Delete ${site.businessName}`}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                            <span className="text-primary hover:text-white text-sm font-medium flex items-center gap-1.5 transition-colors">
                                                View Details
                                                <ExternalLink size={14} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
