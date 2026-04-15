import { View, TextInput, Button } from "react-native";
import { useState } from "react";
import { createPost } from "../src/api/postApi";

export default function Post() {
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [language, setLanguage] = useState("");

    const post = async () => {
        try {
            if (!content || !category || !language) {
                alert("All fields required");
                return;
            }

            await createPost({
                content,
                category,
                language,
            });

            alert("Posted!");

        } catch (e: any) {
            console.log("❌ FULL ERROR:", e);
            console.log("❌ RESPONSE:", e?.response);
            console.log("❌ DATA:", e?.response?.data);

            alert("Failed to post");
        }
    };

    return (
        <View>
            <TextInput placeholder="Write shayari..." onChangeText={setContent} />
            <TextInput placeholder="Category" onChangeText={setCategory} />
            <TextInput placeholder="Language" onChangeText={setLanguage} />

            <Button title="Post" onPress={post} />
        </View>
    );
}