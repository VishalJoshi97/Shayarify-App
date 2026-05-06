import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { FollowButtonType } from "../../types/follow";
import { useTheme } from "../../theme/ThemeContext";
import { themes } from "../../theme/themes";
import { useState } from "react";

export default function FollowButton({
                                         isFollowing,
                                         onFollow,
                                         onUnfollow,
                                     }: FollowButtonType) {
    const { theme } = useTheme();
    // @ts-ignore
    const currentTheme: any = themes[theme];

    const [loading, setLoading] = useState(false);

    const handlePress = async () => {
        try {
            setLoading(true);
            if (isFollowing) {
                if (onUnfollow) {
                    await onUnfollow();
                }
            } else {
                if (onFollow) {
                    await onFollow();
                }
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.8}
            style={{
                flex:1,
                paddingVertical: 10,
                // paddingHorizontal: 16,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                // marginTop: 10,
                // minWidth: 100,

                // 🎨 DIFFERENT STATES
                backgroundColor: isFollowing
                    ? "transparent"
                    : currentTheme.primary,

                borderWidth: isFollowing ? 1 : 0,
                borderColor: currentTheme.primary,
            }}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={isFollowing ? currentTheme.primary : "#fff"}
                />
            ) : (
                <Text
                    style={{
                        color: isFollowing ? currentTheme.primary : "#fff",
                        fontWeight: "600",
                        fontSize: 14,
                    }}
                >
                    {isFollowing ? "Following" : "Follow"}
                </Text>
            )}
        </TouchableOpacity>
    );
}