import {Redirect, Tabs} from "expo-router";
import { useAuth } from "@/app/src/hooks/useAuth";
import { ActivityIndicator, View } from "react-native";

export default function TabsLayout() {
    const { token, loading } = useAuth(); // 🔥 add loading

    //Wait for auth to load
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    //Not logged in
    if (!token) {
        return <Redirect href="/(auth)/login" />;
    }

    //Logged in
    return (
        <Tabs>
            <Tabs.Screen name="feed" />
            <Tabs.Screen name="create" />
            <Tabs.Screen name="chat" />
            <Tabs.Screen name="profile" />
        </Tabs>
    );
}