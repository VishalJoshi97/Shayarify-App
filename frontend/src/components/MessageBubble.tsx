import { View, Text } from "react-native";
import { Message } from "../types/chat";
import { BubbleStyles } from "../constants/BubbleStyles";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { themes } from "../../src/theme/themes";
import { useTheme } from "../../src/theme/ThemeContext";

type Props = {
    message: Message;
    myId: number;
};

function MessageBubble({ message, myId }: Props) {
    const { theme } = useTheme();
    // @ts-ignore
    const currentTheme = themes[theme];

    const isMe = message.senderId === myId;

    const isShayari =
        message.content.length > 80 || message.content.includes("\n");

    // 🎨 Dynamic gradients
    const myGradient: [string, string] = [
        currentTheme.primary,
        currentTheme.primary + "cc",
    ];

    const otherGradient: [string, string] = [
        currentTheme.background === "#fff" ? "#f1f1f1" : "#2a2a3b",
        currentTheme.background === "#fff" ? "#e4e4e4" : "#1e1e2f",
    ];

    return (
        <View
            style={[
                BubbleStyles.container,
                isMe ? BubbleStyles.right : BubbleStyles.left,
            ]}
        >
            <LinearGradient
                colors={isMe ? myGradient : otherGradient}
                style={[
                    BubbleStyles.bubble,
                    isMe ? BubbleStyles.myBubble : BubbleStyles.otherBubble,
                ]}
            >
                {/* ✨ Content */}
                <Text
                    style={[
                        BubbleStyles.text,
                        {
                            color: isMe ? "#fff" : currentTheme.text,
                        },
                        isShayari && {
                            fontStyle: "italic",
                            textAlign: "center",
                            color:
                                theme === "light"
                                    ? "#b8860b" // dark gold
                                    : "#ffd700", // gold
                            lineHeight: 26,
                        },
                    ]}
                >
                    {message.content}
                </Text>

                {/* 🕒 Time */}
                {message.timestamp && (
                    <Text
                        style={[
                            BubbleStyles.time,
                            {
                                color: isMe ? "#eee" : "#aaa",
                            },
                        ]}
                    >
                        {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </Text>
                )}

                {/* ✔ Tick */}
                {isMe && (
                    <Text
                        style={[
                            BubbleStyles.tick,
                            { color: "#fff", opacity: 0.8 },
                        ]}
                    >
                        ✓
                    </Text>
                )}
            </LinearGradient>
        </View>
    );
}

export default React.memo(MessageBubble);