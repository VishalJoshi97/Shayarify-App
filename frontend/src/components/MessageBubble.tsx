import { View, Text } from "react-native";
import { Message } from "../types/chat";
import {BubbleStyles} from "../constants/BubbleStyles";

type Props = {
    message: Message;
    myId: number;
};

export default function MessageBubble({ message, myId }: Props) {
    const isMe = message.senderId === myId;

    return (
        <View
            style={[
                BubbleStyles.container,
                isMe ? BubbleStyles.right : BubbleStyles.left,
            ]}
        >
            <View
                style={[
                    BubbleStyles.bubble,
                    isMe ? BubbleStyles.myBubble : BubbleStyles.otherBubble,
                ]}
            >
                <Text style={BubbleStyles.text}>{message.content}</Text>

                {/* 🔥 Time */}
                {message.timestamp &&(
                <Text style={BubbleStyles.time}>
                    {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </Text>)
                }

                {/* 🔥 Tick */}
                {isMe && <Text style={BubbleStyles.tick}>✓</Text>}
            </View>
        </View>
    );
}