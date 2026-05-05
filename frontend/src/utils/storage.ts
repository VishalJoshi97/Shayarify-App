import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/user";


export const saveToken = async (token: string) => {
    await AsyncStorage.setItem("token", token);
};

export const getToken = async () => {
    return await AsyncStorage.getItem("token");
};

export const removeToken = async () => {
    await AsyncStorage.removeItem("token");
};

const USER_KEY = "user";

export const saveUser = async (user: User) => {
    try {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
        console.log("❌ saveUser error:", e);
    }
};

export const getUser = async (): Promise<User | null> => {
    try {
        const data = await AsyncStorage.getItem(USER_KEY);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.log("❌ getUser error:", e);
        return null;
    }
};

export const removeUser = async () => {
    try {
        await AsyncStorage.removeItem(USER_KEY);
    } catch (e) {
        console.log("❌ removeUser error:", e);
    }
};