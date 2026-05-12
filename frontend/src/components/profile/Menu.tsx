import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import { useTheme } from "@/theme/ThemeContext";
import { themes } from "@/theme/themes";
import {useState} from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Menu(){

    const { theme, setTheme } = useTheme();
    // @ts-ignore
    const currentTheme = themes[theme];
    const isSelected = theme === "dark";

    const [showThemeMenu, setShowThemeMenu] = useState(false);

    return (
        <>
    <View
        style={{
            position: "absolute",
            top: 50,
            left: 16,
            zIndex: 20,
        }}
    >
        <TouchableOpacity
            onPress={() => setShowThemeMenu(!showThemeMenu)}
            activeOpacity={0.7}
            style={{
                flexDirection: "row",
                alignItems: "center",

                backgroundColor: currentTheme.background,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 20,

                borderWidth: 1,
                borderColor: currentTheme.primary,

                // softer shadow
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 6,
                elevation: 3,
            }}
        >
            <Ionicons name="color-palette" size={24} color={currentTheme.primary} />
            <Text style={{
                marginLeft: 6,
                fontSize: 13,
                color:currentTheme.text}}>Themes</Text>
        </TouchableOpacity>
    </View>

    {showThemeMenu && (
        <View
            style={{
                position: "absolute",
                top: 100,
                left: 16,
                backgroundColor: currentTheme.background,
                paddingVertical: 8,
                paddingHorizontal: 2,
                borderRadius: 12,

                // dynamic border
                borderWidth: 1,
                borderColor: currentTheme.primary,

                // shadow
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 5,
                zIndex: 20,
            }}
        >
            {/* DARK */}
            <TouchableOpacity
                onPress={() => {
                    setTheme("dark");
                    setShowThemeMenu(false);
                }}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 8,
                    borderRadius: 8,
                    backgroundColor:
                        theme === "dark" ? currentTheme.primary + "22" : "transparent",
                }}
            >
                <Ionicons name="moon" size={20} color="#9ca3af" />

                <Text style={{ color: currentTheme.text, marginLeft: 8 }}>
                    Dark
                </Text>

                {theme === "dark" && (
                    <Ionicons
                        name="checkmark"
                        size={16}
                        color={currentTheme.primary}
                        style={{ marginLeft: "auto" }}
                    />
                )}
            </TouchableOpacity>

            {/* LIGHT */}
            <TouchableOpacity
                onPress={() => {
                    setTheme("light");
                    setShowThemeMenu(false);
                }}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 8,
                    borderRadius: 8,
                    backgroundColor:
                        theme === "light"
                            ? currentTheme.primary + "33"
                            : "transparent",
                }}
            >
                <Ionicons name="sunny" size={20} color="#ff7a00" />

                <Text style={{ color: currentTheme.text, marginLeft: 8 }}>
                    Light
                </Text>

                {theme === "light" && (
                    <Ionicons
                        name="checkmark"
                        size={16}
                        color={currentTheme.primary}
                        style={{ marginLeft: "auto" }}
                    />
                )}
            </TouchableOpacity>

            {/* SHAYARIFY */}
            <TouchableOpacity
                onPress={() => {
                    setTheme("shayarify");
                    setShowThemeMenu(false);
                }}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 8,
                    borderRadius: 8,
                    backgroundColor:
                        theme === "shayarify"
                            ? "#c9a227" + "22"
                            : "transparent",
                }}
            >
                <Ionicons name="sparkles" size={20} color="#c9a227" />

                <Text style={{ color: currentTheme.text, marginLeft: 8 }}>
                    Shayarify
                </Text>

                {theme === "shayarify" && (
                    <Ionicons
                        name="checkmark"
                        size={16}
                        color={currentTheme.primary}
                        style={{ marginLeft: "auto" }}
                    />
                )}
            </TouchableOpacity>
        </View>
    )}
        </>
)
}

