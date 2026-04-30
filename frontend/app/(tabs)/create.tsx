import {View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput} from "react-native";
import { useRef, useState } from "react";
import {
    RichEditor,
    RichToolbar,
    actions,
} from "react-native-pell-rich-editor";
import { createPost } from "@/api/postApi";
import QuoteRotator from "@/components/ QuoteRotator";
import {useTheme} from "@/theme/ThemeContext";
import {themes} from "@/theme/themes";
import {Dropdown} from "react-native-element-dropdown";
import {Ionicons} from "@expo/vector-icons";

//Crete post tab
export default function CreatePost() {
    const { theme } = useTheme();
    // @ts-ignore
    const currentTheme = themes[theme];

    //flags
    const [loading, setLoading] = useState(false);

    //tab states
    const [title, setTitle] = useState("")
    const [language, setLanguage] = useState("");
    const languages = [
        { label: "English", value: "en" },
        { label: "Hindi", value: "hi" },
        { label: "Urdu", value: "ur" },
    ];
    const editorRef = useRef<RichEditor>(null);
    const [content, setContent] = useState("");


    //1)Post->title,language,content
    const handlePost = async () => {
        //edge case
        if (!content.trim()) {
            alert("Content cannot be empty");
            return;
        }

        //api call-createPost()
        try {
            //post flag
            setLoading(true);//handlind latency to api call

            await createPost({
                title,
                content, // ----HTML content!!
                language
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
        <View style={[
            styles.container,
            { backgroundColor: currentTheme.background },
        ]}>
            {/* TITLE */}
            <TextInput
                placeholder="Title..."
                placeholderTextColor="#777"
                value={title}
                onChangeText={setTitle}
                style={[
                    styles.input,
                    {
                        color: currentTheme.text,
                        borderColor: currentTheme.primary,
                    },
                ]}
            />

            {/*LANGUAGE DROPDOWN */}
            <Dropdown
                style={[
                    styles.dropdown,
                    {
                        borderColor: currentTheme.primary,
                        backgroundColor: currentTheme.background,
                    },
                ]}
                placeholderStyle={{ color: "#777" }}
                selectedTextStyle={{ color: currentTheme.text }}
                data={languages}
                labelField="label"
                valueField="value"
                placeholder="Select Language"
                value={language}
                onChange={(item) => setLanguage(item.value)}
            />

            <Text style={{
                fontSize: 22, fontWeight: "bold", marginBottom: 10 ,
                color:currentTheme.text
            }}>
                <Ionicons name={"book-sharp"} size={20}/>  Create Post
            </Text>

            {/* Rich Editor */}
            <RichEditor
                ref={editorRef}
                onChange={(text) => setContent(text)}
                placeholder="Write your post..."
                editorStyle={{
                    backgroundColor: currentTheme.background,
                    color: currentTheme.text,
                    placeholderColor: "#777",
                }}
                style={{
                    borderWidth: 1,
                    borderColor: currentTheme.primary,
                    borderRadius: 12,
                    minHeight: 250,
                    padding:10
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
                style={{
                    backgroundColor:currentTheme.text,
                    borderWidth: 1,
                    borderRadius: 12,
                    borderColor:currentTheme.primary,
                    paddingHorizontal:10
                }}
            />

            {/* Post Button */}
            <TouchableOpacity
                onPress={handlePost}
                style={{
                    backgroundColor:currentTheme.primary,
                    padding: 14,
                    borderRadius: 8,
                    alignItems: "center",
                    marginTop: 20,
                    width:90,
                    marginLeft:150
                }}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={{ color: '#000', fontWeight: "bold" }}>
                        <Ionicons name={"wine-sharp"}/> Post
                    </Text>
                )}
            </TouchableOpacity>

            {/*Rotating Quotes with images*/}
            <QuoteRotator />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
    },
    dropdown: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 12,
    },
    textArea: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        textAlignVertical: "top",
    },
});