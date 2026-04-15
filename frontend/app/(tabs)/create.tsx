import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRef, useState } from "react";
import {
    RichEditor,
    RichToolbar,
    actions,
} from "react-native-pell-rich-editor";
import { createPostApi } from "../src/api/postApi";

export default function CreatePost() {
    const editorRef = useRef<RichEditor>(null);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePost = async () => {
        if (!content.trim()) {
            alert("Content cannot be empty");
            return;
        }

        try {
            setLoading(true);

            await createPostApi({
                title: "Post",
                content, // HTML content
            });

            alert("Posted successfully 🎉");

            editorRef.current?.setContentHTML("");
            setContent("");
        } catch (e) {
            console.log(e);
            alert("Failed to post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
                ✍️ Create Post
            </Text>

            {/* Rich Editor */}
            <RichEditor
                ref={editorRef}
                onChange={(text) => setContent(text)}
                placeholder="Write your content..."
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    minHeight: 200,
                }}
            />

            {/* Toolbar */}
            <RichToolbar
                editor={editorRef}
                actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.insertBulletsList,
                    actions.insertOrderedList,
                    actions.insertLink,
                ]}
            />

            {/* Post Button */}
            <TouchableOpacity
                onPress={handlePost}
                style={{
                    backgroundColor: "#000",
                    padding: 14,
                    borderRadius: 8,
                    alignItems: "center",
                    marginTop: 20,
                }}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        Post
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}