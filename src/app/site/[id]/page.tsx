"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getSite, deleteSite, type Site } from '@/lib/db';
import { Hero } from '@/components/generator/templates/Hero';
import { ServiceList } from '@/components/generator/templates/ServiceList';
import { About } from '@/components/generator/templates/About';
import { ContactForm } from '@/components/generator/templates/ContactForm';
import { Footer } from '@/components/generator/templates/Footer';
import { Loader2, ArrowLeft, Trash2, Pencil } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function SiteDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [site, setSite] = useState<Site | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const siteId = params.id as string;

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            router.push('/');
            return;
        }

        async function fetchSite() {
            try {
                const fetchedSite = await getSite(siteId);
                if (!fetchedSite || fetchedSite.userId !== user!.uid) {
                    toast.error('Site not found');
                    router.push('/dashboard');
                    return;
                }
                setSite(fetchedSite);
            } catch {
                toast.error('Failed to load site');
                router.push('/dashboard');
            } finally {
                setLoading(false);
            }
        }

        fetchSite();
    }, [siteId, user, authLoading, router]);

    const handleDelete = async () => {
        if (!site) return;
        setDeleting(true);
        try {
            await deleteSite(site.id);
            toast.success('Site deleted');
            router.push('/dashboard');
        } catch {
            toast.error('Failed to delete site');
            setDeleting(false);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="noise-bg" />
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    if (!site) return null;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="noise-bg" />

            {/* Header */}
            <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/dashboard" className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white" aria-label="Back to dashboard">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="font-display text-xl font-bold text-white">{site.businessName}</h1>
                            <p className="text-sm text-gray-500">
                                Created {new Date(site.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={`/?edit=${site.id}`}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all"
                        >
                            <Pencil size={14} />
                            Edit
                        </Link>
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-sm font-medium text-red-400 hover:bg-red-500/20 transition-all"
                            aria-label="Delete site"
                        >
                            <Trash2 size={14} />
                            Delete
                        </button>
                    </div>
                </div>
            </header>

            {/* Delete confirmation dialog */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="glass-panel rounded-2xl p-8 max-w-md w-full mx-4">
                        <h2 className="font-display text-xl font-bold text-white mb-2">Delete Site?</h2>
                        <p className="text-gray-400 mb-6">
                            This will permanently delete &quot;{site.businessName}&quot;. This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/10 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="px-4 py-2 bg-red-500 rounded-xl text-sm font-bold text-white hover:bg-red-600 transition-all disabled:opacity-50"
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Site Preview */}
            <main className="max-w-5xl mx-auto py-8 px-6">
                <div className="rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                    {/* Browser Chrome */}
                    <div className="bg-[#1E1E2E] p-3 flex items-center gap-4 border-b border-white/5">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                        </div>
                        <div className="flex-1 bg-black/30 rounded-md px-4 py-1.5 text-xs text-gray-400 font-mono text-center border border-white/5">
                            {site.businessName.toLowerCase().replace(/\s+/g, '-')}.com
                        </div>
                    </div>

                    {/* Website Content */}
                    <div className="bg-background">
                        <Hero data={site} />
                        {site.aboutText && <About data={site} />}
                        <ServiceList data={site} />
                        <ContactForm data={site} />
                        <Footer data={site} />
                    </div>
                </div>
            </main>
        </div>
    );
}
