import { View, Text } from "react-native";

import { Ionicons } from "@expo/vector-icons";

interface Props {
    roomName: string;
    onlineCount?: number;
    currentTheme: any;
}

export default function RoomHeader({
                                       roomName,
                                       onlineCount = 0,
                                       currentTheme,
                                   }: Props) {

    return (
        <View
            style={{
                paddingHorizontal: 18,
                paddingVertical: 14,

                borderBottomWidth: 0.6,
                borderColor: currentTheme.border,

                flexDirection: "row",
                alignItems: "center",
            }}
        >

            <View
                style={{
                    width: 44,
                    height: 44,

                    borderRadius: 22,

                    backgroundColor:
                        currentTheme.primary + "22",

                    justifyContent: "center",
                    alignItems: "center",

                    marginRight: 12,
                }}
            >

                <Ionicons
                    name="moon"
                    size={22}
                    color={currentTheme.primary}
                />

            </View>

            <View>

                <Text
                    style={{
                        color: currentTheme.text,
                        fontSize: 17,
                        fontWeight: "700",
                    }}
                >
                    {roomName}
                </Text>

                <Text
                    style={{
                        color: currentTheme.primary,
                        marginTop: 2,
                        fontSize: 12,
                    }}
                >
                    {onlineCount} souls online
                </Text>

            </View>

        </View>
    );
}