import {View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert} from "react-native";
import {useEffect, useState} from "react";
import { useRouter } from "expo-router";
import { loginApi } from "../src/api/authApi";
import { useAuth } from "../src/hooks/useAuth";

import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession(); // important

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const { login, token } = useAuth();

    useEffect(() => {
        if (token) {
            console.log("✅ Redirecting to home");
            router.replace("/home");
        }
    }, [token]);

    // 🔐 Normal Login
    const handleLogin = async () => {
        console.log("LOGIN CLICKED");
        try {
            const res = await loginApi({ email, password });

            console.log(res)
            const token = res?.data?.jwtToken;

            if (!token) {
                Alert.alert("Error", "Invalid credentials");
                return;
            }

            await login(token);

            alert("Login Successful!");

        } catch (e: any) {
            console.log(e);
            Alert.alert("Login Failed", "Check your credentials");
        }
    };


    // 🔥 Google OAuth (Expo Go Compatible)
    const handleGoogleLogin = async () => {
        try {
            const redirectUri = AuthSession.makeRedirectUri(
            {useProxy: true} as any, // 🔥 fix
            );

            // console.log(AuthSession.makeRedirectUri({ useProxy: true } as any));

            // const authUrl = "http://localhost:8080/oauth2/authorization/google";
            const authUrl = "http://localhost:8080/oauth2/authorization/google";

            const result = await WebBrowser.openAuthSessionAsync(
                authUrl,
                redirectUri
            );

            if (result.type === "success") {
                const parsed = Linking.parse(result.url);
                const token = parsed.queryParams?.jwtToken;

                if (!token) {
                    Alert.alert("Error", "Token not found");
                    return;
                }

                await login(token as string);
                router.replace("/post");
            }

        } catch (e) {
            console.log(e);
            Alert.alert("OAuth Failed");
        }
    };
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                onChangeText={setPassword}
            />

            <TouchableOpacity
                onPress={handleLogin}
                style={{ backgroundColor: "black", padding: 12 }}
            >
                <Text style={{ color: "white" }}>Login</Text>
            </TouchableOpacity>
            <View style={{ height: 10 }} />
            <Button title="Login with Google" onPress={handleGoogleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    input: {
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    },
});