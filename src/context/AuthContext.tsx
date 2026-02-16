"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
    User,
    GoogleAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    authError: string | null;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    authError: null,
    signInWithGoogle: async () => { },
    signOut: async () => { },
});

function setSessionCookie(user: User | null) {
    if (user) {
        document.cookie = `__session=1; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    } else {
        document.cookie = "__session=; path=/; max-age=0";
    }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
            setSessionCookie(user);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = useCallback(async () => {
        setAuthError(null);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to sign in";
            setAuthError(message);
            throw error;
        }
    }, []);

    const signOut = useCallback(async () => {
        setAuthError(null);
        try {
            await firebaseSignOut(auth);
            setSessionCookie(null);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to sign out";
            setAuthError(message);
            throw error;
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, authError, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
