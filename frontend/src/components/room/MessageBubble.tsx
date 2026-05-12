import {
    View,
    Text,
} from "react-native";

interface Props {
    item: any;
    currentTheme: any;
}

export default function MessageBubble({
                                          item,
                                          currentTheme,
                                      }: Props) {

    const formatTime = (
        time: string
    ) => {

        if (!time) {
            return "";
        }

        return new Date(time)
            .toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
    };

    return (

        <View
            style={{
                marginBottom: 18,

                alignSelf: "flex-start",

                maxWidth: "88%",

                backgroundColor:
                currentTheme.card,

                padding: 14,

                borderRadius: 22,

                borderWidth: 1,

                borderColor:
                currentTheme.border,
            }}
        >

            {/* Username */}

            <Text
                style={{
                    color:
                    currentTheme.primary,

                    fontWeight: "700",

                    marginBottom: 6,
                }}
            >
                {item.senderUsername}
            </Text>

            {/* Message */}

            <Text
                style={{
                    color:
                    currentTheme.text,

                    fontSize: 15,

                    lineHeight: 24,
                }}
            >
                {item.content}
            </Text>

            {/* Time */}

            <Text
                style={{
                    color: "gray",

                    fontSize: 11,

                    marginTop: 8,

                    alignSelf: "flex-end",
                }}
            >
                {formatTime(item.sentAt)}
            </Text>

        </View>
    );
}