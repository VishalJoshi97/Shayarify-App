import {Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import { useTheme } from "@/theme/ThemeContext";
import { themes } from "@/theme/themes";

type Props = {
    logout: () => void;
};

export default function LogOut({logout}: Props) {
    const { theme } = useTheme();
    // @ts-ignore
    const currentTheme = themes[theme];

    return (
        <>
            <View
                style={{
                    position: "absolute",
                    top: 50,
                    right: 16,
                    zIndex: 20,
                }}
            >
                <TouchableOpacity
                    onPress={logout}
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
                    <Ionicons
                        name="log-out-outline"
                        size={20}
                        color={currentTheme.primary}
                    />

                    <Text
                        style={{
                            color: currentTheme.text,
                            marginLeft: 6,
                            fontSize: 13,
                        }}
                    >
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}