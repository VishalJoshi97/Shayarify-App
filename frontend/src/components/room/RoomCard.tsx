import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";

import {
    Ionicons,
} from "@expo/vector-icons";

interface Props {
    room: any;
    currentTheme: any;
    onPress: () => void;
}

export default function RoomCard({
                                     room,
                                     currentTheme,
                                     onPress,
                                 }: Props) {

    return (
        <TouchableOpacity
            activeOpacity={0.85}

            onPress={onPress}

            style={{
                width: 220,

                backgroundColor:
                currentTheme.card,

                borderRadius: 28,

                padding: 18,

                marginRight: 14,

                borderWidth: 1,
                borderColor:
                currentTheme.border,

                elevation: 3,
            }}
        >

            <View
                style={{
                    width: 58,
                    height: 58,

                    borderRadius: 29,

                    backgroundColor:
                        currentTheme.primary + "22",

                    justifyContent: "center",
                    alignItems: "center",

                    marginBottom: 16,
                }}
            >

                <Ionicons
                    name="moon"
                    size={28}
                    color={currentTheme.primary}
                />

            </View>

            <Text
                style={{
                    color: currentTheme.text,

                    fontSize: 18,
                    fontWeight: "700",
                }}
            >
                {room.roomName}
            </Text>

            <Text
                style={{
                    color: "#999",

                    marginTop: 8,

                    fontSize: 13,
                    lineHeight: 20,
                }}
            >
                poetry & deep conversations
            </Text>

            <Text
                style={{
                    color: currentTheme.primary,

                    marginTop: 14,

                    fontSize: 12,
                    fontWeight: "700",
                }}
            >
                room code • {room.roomCode}
            </Text>

        </TouchableOpacity>
    );
}