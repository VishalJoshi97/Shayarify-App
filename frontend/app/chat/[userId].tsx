import { useEffect, useState, useRef, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    TextInput,
    Button,
    KeyboardAvoidingView,
    Platform, TouchableOpacity, Keyboard,
} from "react-native";

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

import { getChatApi } from "../../src/api/chatApi";
import MessageBubble from "../../src/components/MessageBubble";
import { Message } from "../../src/types/chat";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "../../src/hooks/useAuth";

import { themes } from "../../src/theme/themes";
import { useTheme } from "../../src/theme/ThemeContext";

import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import {KeyboardAwareFlatList} from "react-native-keyboard-aware-scroll-view";


export default function ChatScreen() {
const { theme } = useTheme();
// @ts-ignore
const currentTheme = themes[theme];

    const { userId } = useLocalSearchParams();
    const rId = Number(userId);

    const { user, loading } = useAuth();

    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState("");

    const clientRef = useRef<Client | null>(null);
    const flatListRef = useRef<FlatList<Message> | null>(null);
    const hasInitialScrolled = useRef(false);

    const mId = user?.id;

    // 🔥 MEMO RENDER ITEM
    // @ts-ignore
    const renderItem = useCallback(({ item }) => (
    // @ts-ignore
        <MessageBubble message={item} myId={mId} />
    ), [mId]);


    //keyboard
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
            setKeyboardHeight(e.endCoordinates.height);
        });

        const hideSub = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardHeight(0);
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    // 🔥 LOAD MESSAGES
    useEffect(() => {
        if (!user || !rId) return;

        const loadMessages = async () => {
            const data: Message[] = await getChatApi(rId);
            setMessages(data);
        };
        hasInitialScrolled.current = false;
        loadMessages();
    }, [rId, user]);

    // 🔥 ONLY ONE SCROLL (FINAL FIX)
    useEffect(() => {
        if (messages.length === 0 || hasInitialScrolled.current) return;

        const id = requestAnimationFrame(() => {
            flatListRef.current?.scrollToEnd({ animated: false });
            hasInitialScrolled.current = true; // 🔥 only once
        });

        return () => cancelAnimationFrame(id);
    }, [messages.length]);


    // 🔥 WEBSOCKET
    useEffect(() => {
        if (!user) return;

        const client = new Client({
            webSocketFactory: () =>
                new SockJS("http://172.16.34.215:8080/ws"),
            reconnectDelay: 3000,
        });

        client.onConnect = () => {
            console.log("✅ WebSocket Connected");

            client.subscribe(`/topic/messages/${user.id}`, (msg) => {
                const message: Message = JSON.parse(msg.body);

                setMessages(prev => {
                    if (message.senderId === user.id) return prev;
                    if (prev.some(m => m.id === message.id)) return prev;
                    return [...prev, message];
                });

                // scroll for new incoming
                requestAnimationFrame(() => {
                    flatListRef.current?.scrollToEnd({ animated: true });
                });
            });
        };

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, [user]);

    if (loading || !user) {
        return (
            <View style={{ backgroundColor:currentTheme.background,flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{color:currentTheme.text}}>Loading...</Text>
            </View>
        );
    }

    // 🔥 SEND MESSAGE
    const sendMessage = () => {
        if (!text.trim() || !clientRef.current) return;

        const tempMessage = {
            id: Date.now() + Math.random(),
            senderId: mId,
            receiverId: rId,
            content: text,
            timestamp: new Date().toISOString(),
            isTemp: true,
        };

        // @ts-ignore
        setMessages(prev => [...prev, tempMessage]);

        clientRef.current.publish({
            destination: "/app/chat",
            body: JSON.stringify({
                senderId: mId,
                receiverId: rId,
                content: text,
            }),
        });

        setText("");

        // scroll immediately
        requestAnimationFrame(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        });
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme.background }}>
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: currentTheme.background }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}

        >
            <View style={{ flex: 1 ,backgroundColor:currentTheme.background }}>

                <FlatList
                    keyboardShouldPersistTaps="handled"
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id!.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        padding: 10,
                        flexGrow: 1,
                        paddingBottom: keyboardHeight + 10,
                    }}
                    keyboardDismissMode="on-drag"
                    removeClippedSubviews
                    initialNumToRender={20}
                    windowSize={5}

                    maxToRenderPerBatch={10}
                    updateCellsBatchingPeriod={50}
                    scrollEventThrottle={16}
                />

                {/*<KeyboardAwareFlatList*/}
                {/*    data={messages}*/}
                {/*    keyExtractor={(item) => item.id!.toString()}*/}
                {/*    renderItem={renderItem}*/}
                {/*    contentContainerStyle={{*/}
                {/*        padding: 10,*/}
                {/*        flexGrow: 1,*/}
                {/*    }}*/}

                {/*    enableOnAndroid={true} // 🔥 important*/}
                {/*    extraScrollHeight={80} // 🔥 pushes input above keyboard*/}
                {/*    keyboardShouldPersistTaps="handled"*/}
                {/*/>*/}

                <TouchableOpacity
                    onPress={() => flatListRef.current?.scrollToEnd({ animated: true })}
                    style={{
                        position: "absolute",
                        bottom: 80,
                        right: 20,
                        backgroundColor: currentTheme.background,
                        padding: 10,
                        borderRadius: 20,
                        elevation: 5,
                    }}
                >
                    <Text style={{ color: currentTheme.primary, fontWeight: "bold" }}>↓</Text>
                </TouchableOpacity>

                {messages.length === 0 && (
                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        <Text style={{color:currentTheme.text}}>No messages yet 👋</Text>
                    </View>
                )}


                <View style={{
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    backgroundColor: currentTheme.background,
                    borderTopWidth: 1,
                    borderColor: "#ddd",
                    marginBottom:32
                }}>
                    <TextInput
                        value={text}
                        onChangeText={setText}
                        placeholder="Type message..."
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 20,
                            paddingHorizontal: 12,
                            paddingVertical: 5,
                            marginRight: 8,
                            color:currentTheme.text,
                        }}
                    />
                    <TouchableOpacity onPress={sendMessage}>
                        <LinearGradient
                            colors={[currentTheme.primary, "#ff7eb3"]}
                            style={{
                                borderRadius: 50,
                                padding: 10,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Ionicons name="send" size={18} color="#fff" />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
}