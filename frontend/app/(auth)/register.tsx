import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { registerApi } from "../src/api/authApi";

export default function Register() {
    const router = useRouter();

    const [username, setUsername] = useState(""); // 🔥 NEW
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async () => {
        setError("");

        // 🔍 validation
        if (!username || !email || !password) {
            setError("All fields are required");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);

            await registerApi({
                username, // 🔥 NEW
                email,
                password,
            });

            alert("Account created 🎉");

            router.replace("/(auth)/login");

        } catch (err: any) {
            console.log(err);

            setError(
                err?.response?.data?.message || "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>

            {/* Title */}
            <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
                Create Account
            </Text>

            {/* Username 🔥 */}
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 12,
                }}
            />

            {/* Email */}
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 12,
                }}
            />

            {/* Password */}
            <TextInput
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 12,
                }}
            />

            {/* Error */}
            {error ? (
                <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
            ) : null}

            {/* Register Button */}
            <TouchableOpacity
                onPress={handleRegister}
                style={{
                    backgroundColor: "#000",
                    padding: 14,
                    borderRadius: 8,
                    alignItems: "center",
                    marginBottom: 10,
                }}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        Register
                    </Text>
                )}
            </TouchableOpacity>

            {/* Navigate to Log in */}
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text style={{ textAlign: "center", color: "blue" }}>
                    Already have an account? Login
                </Text>
            </TouchableOpacity>

        </View>
    );
}