import React, { createContext, useEffect, useState, ReactNode } from "react";
import {getToken, saveToken, removeToken, getUser, saveUser,removeUser} from "../utils/storage";
import {User} from "@/app/src/types/user";

type AuthContextType = {
    token: string | null;
    user: User | null; // 🔥 ADD THIS
    loading: boolean;
    login: (token: string, user: User) => Promise<void>; // 🔥 update
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
    token: null,
    user: null,
    loading: true,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); // 🔥 NEW
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const loadAuth = async () => {
            try {
                const storedToken = await getToken();
                const storedUser = await getUser();

                if (storedToken) setToken(storedToken);
                if (storedUser) setUser(storedUser); // 🔥 IMPORTANT
            } catch (e) {
                console.log("AsyncStorage error:", e);
            } finally {
                setLoading(false);
            }
        };

        loadAuth();
    }, []);

    const login = async (token: string,user: User) => {
        await saveToken(token);
        await saveUser(user);
        setToken(token);
        setUser(user); //store user
    };

    const logout = async () => {
        await removeToken();
        await removeUser(); // 🔥 REMOVE USER
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token,user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};