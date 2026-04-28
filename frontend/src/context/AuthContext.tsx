import React, { createContext, useEffect, useState, ReactNode } from "react";
import {getToken, saveToken, removeToken, getUser, saveUser,removeUser} from "../utils/storage";
import {User} from "../types/user";
import {AuthContextType, Profile} from "../types/auth"
import { getProfile } from "../api/profileApi";


//1)Define Context
export const AuthContext = createContext<AuthContextType>({
    token: null,
    user: null,
    loading: true,//initially loading should be true
    login: async () => {},
    logout: async () => {},
    profile:null,
    setProfile: () => {},
});

//2)Create Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    //profile
    const [profile, setProfile] = useState<Profile | null>(null);
    //2.1)always run it to get token
    useEffect(() => {
        const loadAuth = async () => {
            try {
                const storedToken = await getToken();
                const storedUser = await getUser();

                if (storedToken) setToken(storedToken);
                if (storedUser) setUser(storedUser);
                console.log("LOADED AUTH DATA TOKEN AND USER SUCCESSFULLY!");
            } catch (e) {
                console.debug("AsyncStorage error In Auth Context:", e);
            } finally {
                setLoading(false);//after getting token loading should be false
            }
        };

        loadAuth();
    }, []);

    //2.2)login
    const login = async (token: string,user: User) => {
        await saveToken(token);
        await saveUser(user);
        setToken(token);
        setUser(user); //store user
    };

    useEffect(() => {
        if (!token) return;

        fetchProfile();
    }, [token]);

    const fetchProfile = async () => {
        try {
            const res = await getProfile();
            setProfile(res.data);
            console.log("PROFILE LOADED");
        } catch (e) {
            console.log("Profile fetch error", e);
        }
    };

    //2.3)logout
    const logout = async () => {
        await removeToken();
        await removeUser();//REMOVE USER
        setToken(null);
        setUser(null);
        setProfile(null);
    };



    return (
        <AuthContext.Provider value={{ token,user, loading, login, logout ,profile,setProfile}}>
            {children}
        </AuthContext.Provider>
    );
};