import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import { getConversationsApi } from "../src/api/chatApi";
import {DmStyles} from "@/app/src/constants/DmStyles";

type ChatItem = {
    userId: number;
    username: string;
    lastMessage: string;
    timestamp: string;
};

export default function DM() {
    const [chats, setChats] = useState<ChatItem[]>([]);
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            loadChats();
        }, [])
    );

    const loadChats = async () => {
        const data = await getConversationsApi();
        setChats(data.filter((c: any) => c.userId !== null));
    };

    const openChat = (userId: number) => {
        router.push({
            pathname: "/chat/[userId]",
            params: {
                userId: userId.toString(),
                receiverId: userId.toString(),
            },
        });
    };

    const formatTime = (time: string) => {
        const date = new Date(time);
        const now = new Date();

        const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diff < 60) return "now";
        if (diff < 3600) return `${Math.floor(diff / 60)}m`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h`;

        return date.toLocaleDateString();
    };

    const getInitials = (name: string) => {
        return name?.charAt(0).toUpperCase();
    };

    return (
        <FlatList
            data={chats}
            keyExtractor={(item) => item.userId.toString()}
            contentContainerStyle={{ paddingVertical: 10 }}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => openChat(item.userId)}
                    style={DmStyles.row}
                >
                    {/* 🔵 Avatar */}
                    <View style={DmStyles.avatar}>
                        <Text style={DmStyles.avatarText}>
                            {getInitials(item.username)}
                        </Text>
                    </View>

                    {/* 💬 Content */}
                    <View style={DmStyles.textContainer}>
                        <View style={DmStyles.topRow}>
                            <Text style={DmStyles.username}>
                                {item.username}
                            </Text>

                            <Text style={DmStyles.time}>
                                {formatTime(item.timestamp)}
                            </Text>
                        </View>

                        <Text
                            numberOfLines={1}
                            style={DmStyles.message}
                        >
                            {item.lastMessage}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
}