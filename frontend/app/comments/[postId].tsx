import {
    View,
    Text,
    FlatList,
    TextInput,
    Button
} from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import { getCommentsApi, addCommentApi } from "../../src/api/commentApi";
import { Comment } from "../../src/types/comment";

export default function CommentsScreen() {
    const { postId } = useLocalSearchParams();

    const [comments, setComments] = useState<Comment[]>([]);
    const [text, setText] = useState("");

    const pId = Number(postId);

    useEffect(() => {
        loadComments();
    }, []);

    //get
    const loadComments = async () => {
        const data = await getCommentsApi(pId);
        setComments(data);
    };

    const sendComment = async () => {
        if (!text.trim()) return;

        await addCommentApi(pId, text);

        // reload comments
        loadComments();
        setText("");
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>

            <FlatList
                data={comments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontWeight: "bold" }}>
                            {item.username}
                        </Text>

                        <Text>{item.content}</Text>

                        <Text style={{ fontSize: 10, color: "gray" }}>
                            {new Date(item.createdAt).toLocaleTimeString()}
                        </Text>
                    </View>
                )}
            />

            <View style={{ flexDirection: "row" }}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder="Write comment..."
                    style={{
                        flex: 1,
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                    }}
                />

                <Button title="Send" onPress={sendComment} />
            </View>

        </View>
    );
}