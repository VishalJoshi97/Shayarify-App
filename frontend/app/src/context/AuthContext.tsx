import React, { createContext, useEffect, useState, ReactNode } from "react";
import { getToken, saveToken, removeToken } from "../utils/storage";

type AuthContextType = {
    token: string | null;
    loading: boolean; // 🔥 NEW
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
    token: null,
    loading: true,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); // 🔥 NEW

    useEffect(() => {
        const loadToken = async () => {
            try {
                const stored = await getToken();
                if (stored) setToken(stored);
            } catch (e) {
                console.log("❌ AsyncStorage error:", e);
            } finally {
                setLoading(false); // ✅ ALWAYS runs
            }
        };

        loadToken();
    }, []);
    const login = async (token: string) => {
        await saveToken(token);
        setToken(token);
    };

    const logout = async () => {
        await removeToken();
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};