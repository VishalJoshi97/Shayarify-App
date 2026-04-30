import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import { useAuth } from "../src/hooks/useAuth";

//Entry point of the app-aka splash screen
//decides where to redirect based on-> jwt token info
export default function Index(){
    const router = useRouter();
    const { token, loading } = useAuth();//from AuthContext then useAuth updates states

    useEffect(() => {
        if (!loading) {//loading should be false(from context)
            if (token) {//now u have token
                console.log("Already has token...")
                router.replace("/(tabs)/feed")
            } else {
                router.replace("/(auth)/login");
            }
        }
        console.log("LOADING:  ",loading);
        console.log("TOKEN:  ",token);
    }, [token, loading]);


    //show the app logo for <= 2 sec
     return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 24 }}>Shayarify ✨</Text>
            <ActivityIndicator style={{ marginTop: 20 }} />
        </View>
    );
}