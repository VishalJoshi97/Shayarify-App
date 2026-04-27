import {View, Text} from "react-native";
import { SharePayload} from "../types/share";
import {ShareStyles as styles} from "../constants/ShareStyles";
import {LinearGradient} from "expo-linear-gradient";
import {getBackground, getFont} from "../hooks/useFonts";

export function ShareCard({text, author, font, background}: SharePayload) {


    //based on mood
    const fontFamily = getFont(font);
    const colors = getBackground(background);
    const isLight = background === "light"

    return (
        <LinearGradient colors={colors} style={styles.card}>
            <View
                        style={[
                            styles.overlay,
                            isLight ? styles.lightOverlay : styles.darkOverlay,
                        ]}
                    >
            <Text style={[
                                styles.text,
                                isLight ? styles.textDark : styles.textLight,
                {fontFamily}
                            ]} >
                {text}
            </Text>

            <Text style={styles.author}>— {author}</Text>


            <Text style={styles.brand}>Shayarify ✨</Text>
            </View>
        </LinearGradient>
    )
}
