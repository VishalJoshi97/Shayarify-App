import {LinearGradient} from "expo-linear-gradient";
import {Text, TouchableOpacity} from "react-native";

export default function Inspire(){
    return(
        <>
            <TouchableOpacity
                style={{
                    position: "absolute",
                    bottom: 100,
                    right: 20,
                    borderRadius: 50,
                    overflow: "hidden",
                }}
            >
                <LinearGradient
                    colors={["#ff7eb3", "#ff758c"]}
                    style={{
                        padding: 14,
                        borderRadius: 50,
                    }}
                >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        ✨ Inspire
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </>
    )
}