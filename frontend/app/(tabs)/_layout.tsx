import { Redirect, Tabs } from "expo-router";
import { useAuth } from "../../src/hooks/useAuth";
import { ActivityIndicator, View, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../src/theme/ThemeContext";
import { themes } from "../../src/theme/themes";

export default function TabsLayout() {
    const { token, loading, user,profile } = useAuth();

    const { theme, setTheme } = useTheme();
    // @ts-ignore
    const currentTheme = themes[theme];

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#d4af37" />
            </View>
        );
    }

    if (!token) return <Redirect href="/(auth)/login" />;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,

                tabBarStyle: {
                    position: "absolute",
                    bottom: 10,
                    left: 16,
                    right: 16,

                    height: 55,
                    backgroundColor: currentTheme.background,
                    borderRadius: 20,
                    borderColor: "#0d0d0d",

                    //softer shadow
                    shadowColor: "#000",
                    shadowOpacity: 0.12,
                    shadowRadius: 8,
                    elevation: 6,
                },

                tabBarActiveTintColor: "#d4af37",
                tabBarInactiveTintColor: "#777",

                tabBarItemStyle: {
                    paddingVertical: 7, // 🔥 tighter spacing
                },
            }}
        >
            {/* FEED */}
            <Tabs.Screen
                name="feed"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{ alignItems: "center" }}>
                            <Ionicons
                                name={focused ? "book" : "book-outline"}
                                size={26}
                                color={color}
                            />
                            {focused && (
                                <View
                                    style={{
                                        width: 5,
                                        height: 5,
                                        borderRadius: 3,
                                        backgroundColor: "#d4af37",
                                        marginTop: 4,
                                    }}
                                />
                            )}
                        </View>
                    ),
                }}
            />

            {/* CREATE*/}
            <Tabs.Screen
                name="create"
                options={{
                    tabBarIcon: () => (
                        <View
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                backgroundColor: "#d4af37",
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: 30,

                                shadowColor: "#d4af37",
                                shadowOpacity: 0.4,
                                shadowRadius: 15,
                            }}
                        >
                            <Ionicons name="create" size={26} color="#000" />
                        </View>
                    ),
                }}
            />

            {/*CHAT */}
            <Tabs.Screen
                name="chat"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{ alignItems: "center" }}>
                            <Ionicons
                                name={focused ? "chatbubble-ellipses" : "chatbubble-outline"}
                                size={26}
                                color={color}
                            />
                            {focused && (
                                <View
                                    style={{
                                        width: 5,
                                        height: 7,
                                        borderRadius: 3,
                                        backgroundColor: "#d4af37",
                                        marginTop: 4,
                                    }}
                                />
                            )}
                        </View>
                    ),
                }}
            />

            {/*PROFILE */}
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                borderWidth: focused ? 2 : 0,
                                borderColor: "#d4af37",
                                borderRadius: 20,
                                padding: 3.5,
                            }}
                        >
                            <Image
                                source={{
                                    uri:
                                        profile?.imageUrl ||
                                        "https://i.pravatar.cc/150?img=11",
                                }}
                                style={{
                                    width: 28,
                                    height: 30,
                                    borderRadius: 14,
                                }}
                            />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}