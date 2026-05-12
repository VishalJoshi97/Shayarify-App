import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { themes } from "../../theme/themes";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    userId: number;
};

export default function MessageButton({ userId }: Props) {
    const { theme } = useTheme();
    // @ts-ignore
    const currentTheme: any = themes[theme];

    const goToChat = () => {
        router.push(`/chat/${userId}`); //clean navigation
    };

    return (
        <TouchableOpacity
            onPress={goToChat}
            activeOpacity={0.8}
            style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",

                borderWidth: 1,
                borderColor: currentTheme.primary,
                backgroundColor: "transparent",
                flexDirection: "row",
                gap: 6,
            }}
        >
            <Ionicons
                name="chatbubble-outline"
                size={16}
                color={currentTheme.primary}
            />

            <Text
                style={{
                    color: currentTheme.primary,
                    fontWeight: "600",
                    fontSize: 14,
                }}
            >
                Message
            </Text>
        </TouchableOpacity>
    );
}