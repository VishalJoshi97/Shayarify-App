import { StyleSheet } from 'react-native';

export const DmStyles = StyleSheet.create({
    row: {
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 12,
        alignItems: "center",
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#007AFF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    avatarText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

    textContainer: {
        flex: 1,
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    username: {
        fontSize: 16,
        fontWeight: "600",
    },

    time: {
        fontSize: 12,
        color: "#999",
    },

    message: {
        marginTop: 4,
        color: "#666",
    },
});