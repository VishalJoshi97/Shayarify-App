import {View, Text, TouchableOpacity} from "react-native";
import RenderHTML from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import {PostCardStyles} from "../constants/PostCardStyles";
import LikeButton from "../components/LikeButton";
import {router} from "expo-router";

type Props = {
    item: {
        id: number;
        userId: number;
        username: string;
        content: string;
        createdAt: string;
        likes?: number;
        comments?: number;
        onAuthorPress?: () => void
    };
};

export default function PostCard({ item }: Props) {
    const { width } = useWindowDimensions();
    // console.log("Item: ",item)
    const formatTime = (time: string) => {
        if (!time) return "";
        const date = new Date(time);
        const now = new Date();
        const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diff < 60) return "now";
        if (diff < 3600) return `${Math.floor(diff / 60)}m`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h`;

        return date.toLocaleDateString();
    };

    return (
        <View style={PostCardStyles.card}>

            {/* 🔹 Header */}
            <View style={PostCardStyles.header}>

                <TouchableOpacity onPress={() => {
                    router.push(`/profile/${item.userId}`);//api call-> profile/[id]
                }}>
                <Text style={PostCardStyles.username}>
                    {item.username || "Anonymous"}
                </Text>
                </TouchableOpacity>

                <Text style={PostCardStyles.time}>
                    {formatTime(item.createdAt)}
                </Text>
            </View>

            {/* 🔹 Shayari Content */}
            <RenderHTML
                contentWidth={width}
                source={{
                    html: item.content
                        .replace(/<div>/g, "<p>")
                        .replace(/<\/div>/g, "</p>")
                }}
                tagsStyles={{
                    p: PostCardStyles.text,
                    b: { fontWeight: "bold" },
                    i: { fontStyle: "italic"},
                }}
            />

            {/* 🔹 Actions */}
            <View style={PostCardStyles.actions}>
                <Text style={PostCardStyles.action}><LikeButton postId={item.id} /></Text>
                <Text onPress={() => router.push({
                    pathname: "/comments/[postId]",
                    params: {
                        postId: item.id.toString(),
                    },
                })}>
                    💬 Comment
                </Text>
                <Text style={PostCardStyles.action}>🔖 Save</Text>
                <Text
                    onPress={() =>
                        router.push({
                            pathname: "/share/[postId]",
                            params: {
                                postId: item.id.toString(),
                                text: item.content.replace(/<[^>]+>/g, ""),
                                author: item.username,
                            },
                        })
                    }
                >
                    🔁 Share
                </Text>
            </View>
        </View>
    );
}