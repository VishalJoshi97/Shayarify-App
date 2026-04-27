import { StyleSheet } from 'react-native';

export const BubbleStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 4,
        paddingHorizontal: 10,
    },

    left: {
        justifyContent: "flex-start",
    },

    right: {
        justifyContent: "flex-end",
    },

    bubble: {
        maxWidth: "75%",
        padding: 10,
        borderRadius: 12,
    },

    myBubble: {
        backgroundColor: "#DCF8C6",
        borderTopRightRadius: 0,
    },

    otherBubble: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 0,
    },

    text: {
        fontSize: 16,
        color: "#000",
    },

    time: {
        fontSize: 10,
        color: "#555",
        marginTop: 4,
        alignSelf: "flex-end",
    },

    tick: {
        fontSize: 10,
        color: "#555",
        alignSelf: "flex-end",
    },
});