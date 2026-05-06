import { View, Text, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useTheme } from "../../theme/ThemeContext";
import { themes } from "../../theme/themes";
export default function UserItem({ user }) {

    const { theme } = useTheme();
    const currentTheme:any = themes[theme];

    return (
        <TouchableOpacity
            onPress={() => router.push(`/profile/${user.id}`)}
            style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 12,
                borderBottomWidth: 0.5,
                borderColor: "#333",
            }}
        >
            {/*Profile Image */}
            <Image
                source={{
                    uri:
                        user.imageUrl ||
                        "https://i.pravatar.cc/150?img=3", // fallback image
                }}
                style={{
                    width: 45,
                    height: 45,
                    borderRadius: 22.5,
                }}
            />

            {/*Username */}
            <Text
                style={{
                    color: currentTheme.text,
                    marginLeft: 12,
                    fontSize: 16,
                    fontWeight: "500",
                }}
            >
                {user.username}
            </Text>
        </TouchableOpacity>
    );
}