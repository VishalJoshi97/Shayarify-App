import {Text, View} from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { themes } from "@/theme/themes";

type Props = {
    count: number;
};

export default function PostCount({count}:Props){
    const { theme } = useTheme();
    // @ts-ignore
    const currentTheme = themes[theme];

    return (
        <>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <View>
                    <Text style={{ color: currentTheme.text, fontWeight: "bold" }}>
                        {count}
                    </Text>
                    <Text style={{ color: "gray" }}>Posts</Text>
                </View>
            </View>

        </>
    )
}