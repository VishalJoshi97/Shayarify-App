import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import { useAuth } from "./src/hooks/useAuth";
import {getToken} from "@/app/src/utils/storage";

export default function Index() {
    const router = useRouter();
    const { token, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            if (token) {
                router.replace("/(tabs)/profile");
            } else {
                router.replace("/(auth)/login");
            }
        }
        console.log("TOKEN: ",token);
        console.log("LOADING: ",loading);
    }, [token, loading]);


     return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 24 }}>Shayarify ✨</Text>
            <ActivityIndicator style={{ marginTop: 20 }} />
        </View>
    );
}