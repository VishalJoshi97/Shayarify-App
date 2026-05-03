import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {fetchMyPosts, getPostCount} from "../../src/api/postApi";
import RenderHTML from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { useTheme } from "../../src/theme/ThemeContext";
import { themes } from "../../src/theme/themes";

export default function PostScreen() {
    const { postId } = useLocalSearchParams();
    const [post, setPost] = useState<any>(null);
    const { width } = useWindowDimensions();

    const { theme } = useTheme();
    // @ts-ignore
    const currentTheme = themes[theme];

    useEffect(() => {
        if (!postId) return;
        getPostCount(5).then(setPost);
    }, [postId]);

    if (!post) return <Text>Loading...</Text>;

    return (
        <ScrollView style={{ flex: 1, padding: 15, backgroundColor: currentTheme.background }}>
            <View>
            <Text style={{ color: currentTheme.text, fontWeight: "bold", marginBottom: 10 }}>
                {post}
            </Text>
            </View>
            <RenderHTML
                contentWidth={width}
                source={{ html: post.content }}
                tagsStyles={{
                    p: {
                        color: currentTheme.text,
                        fontSize: 16,
                        lineHeight: 24,
                    },
                }}
            />

        </ScrollView>
    );
}