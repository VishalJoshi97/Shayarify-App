import {
    View,
    TouchableOpacity,
    Text,
    ScrollView, Platform,
} from "react-native";
import {useState, useRef, useEffect} from "react";
import ViewShot from "react-native-view-shot";
// import {Share}  from "react-native";
import * as Sharing from 'expo-sharing';
import {ShareCard} from "../../src/components/share/ShareCard";
import { FontType, BackgroundType } from "../../src/types/share";
import {useAuth} from "../../src/hooks/useAuth";
import {Shayari} from "../../src/types/shayari";
import {getProfile} from "../../src/api/profileApi";
import { useRouter } from "expo-router";


export default function ShareScreen() {
    const [font, setFont] = useState<FontType>("default");
    const [background, setBackground] = useState<BackgroundType>("love");
    const {user}=useAuth()
    const ref = useRef<ViewShot>(null);
    const [content, setContent] = useState("JHello");

    const fonts: FontType[] = ["default", "Playfair", "handwritten"];
    const backgrounds: BackgroundType[] = ["love", "royal", "dark", "light"];
    const router = useRouter();

    useEffect(() => {
        const callpreofile= async ()=>{
         const res=   await getProfile()
        console.log(res.data)
        setContent(res.data.bio)
        }

        callpreofile()
    }, []);

    const captureAndShare = async () => {
        try {
            if (!ref.current) return;

            await new Promise((res) => setTimeout(res, 300));

            // @ts-ignore
            const uri = await ref.current.capture({
                format: "jpg",
                quality: 0.7,
            });



            console.log("Captured URI:", uri);

            const isAvailable = await Sharing.isAvailableAsync();

            if (isAvailable) {
                // 3. Share the file directly
                await Sharing.shareAsync(uri, {
                    mimeType: 'image/jpeg',
                    dialogTitle: 'Share your card',
                    UTI: 'public.jpeg', // This helps iOS recognize it's an image
                });
            } else {
                console.log("Sharing is not available on this platform");
            }
         }catch(err) {
            console.log("Capture Failed!" ,err);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>

            {/* 🔥 Preview for Instagram and WhatsApp */}
            <ViewShot ref={ref}
                      options={{ format: "jpg", quality: 0.9 }}
                      style={{ width: 360, height: 640 }}>
                <ShareCard
                    text={content}
                    author={user?.username  || "unknown"}
                    font={font}
                    background={background}
                    template="dark"
                />
            </ViewShot>

            {/* FONT PICKER */}
            <View style={{ flexDirection: "row" }}>
                <Text style={{ margin: 10 }}>Fonts:</Text>
                {fonts.map((f) => (
                    <TouchableOpacity key={f} onPress={() => setFont(f)}>
                        <Text style={{ margin: 10 }}>{f}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* BACKGROUND PICKER */}
            <View style={{ flexDirection: "row" }}>
                <Text style={{ margin: 10}}>Theme:</Text>
                {backgrounds.map((b) => (
                    <TouchableOpacity key={b} onPress={() => setBackground(b)}>
                        <Text style={{ margin: 10 }}>{b}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                onPress={captureAndShare}
                style={{
                    marginTop: 20,
                    padding: 12,
                    backgroundColor: "#007AFF",
                    borderRadius: 10,
                }}
            >
                <Text style={{ color: "#fff" }}>Share</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}