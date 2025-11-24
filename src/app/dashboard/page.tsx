"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserSites, Site } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { Loader2, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [sites, setSites] = useState<Site[]>([]);
    const [fetching, setFetching] = useState(true);

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
            } catch (error) {
                console.error("Error fetching sites:", error);
            } finally {
                setFetching(false);
            }
        };

        if (user) {
            fetchSites();
        }
    }, [user]);

    if (loading || fetching) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">My Sites</h1>
                    </div>
                    <Link href="/" className="btn btn-primary">
                        Create New Site
                    </Link>
                </div>

                {sites.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">No sites yet</h2>
                        <p className="text-gray-500 mb-6">Create your first website with AI in seconds.</p>
                        <Link href="/" className="btn btn-primary">
                            Get Started
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sites.map((site) => (
                            <div key={site.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="h-40 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                                    <span className="text-4xl">🌐</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{site.businessName}</h3>
                                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{site.heroHeadline}</p>

                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                                        <span className="text-xs text-gray-400">
                                            {new Date(site.createdAt).toLocaleDateString()}
                                        </span>
                                        {/* Placeholder for future "Edit" or "View" functionality */}
                                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                                            View Details <ExternalLink size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
