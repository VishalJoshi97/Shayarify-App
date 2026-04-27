import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

export default function MusicPlayer() {
    const [sound, setSound] = useState<any>(null);
    const [playing, setPlaying] = useState(false);

    const toggleMusic = async () => {
        if (playing) {
            await sound.stopAsync();
            setPlaying(false);
        } else {
            const { sound } = await Audio.Sound.createAsync(
                require("../../assets/music/music.mp3")
            );
            setSound(sound);
            await sound.playAsync();
            setPlaying(true);
        }
    };

    return (
        <TouchableOpacity  activeOpacity={0.7} onPress={toggleMusic}>
            <Text style={{
                marginTop: 16,
                textAlign: "center",
                color: "#888",
                fontSize: 13, }}>
                {playing ? "Pause 🎶" : "Play 🎶"}
            </Text>
        </TouchableOpacity>
    );
}