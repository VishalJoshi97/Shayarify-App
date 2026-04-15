import {ScrollView, Text, useWindowDimensions, View} from "react-native";
import { useEffect, useState } from "react";
import Client from "../src/api/client";
import { Shayari } from "../src/types/types";
import RenderHTML from "react-native-render-html";

export default function Feed() {
    const [data, setData] = useState<Shayari[]>([]);
    const { width } = useWindowDimensions();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await Client.get<Shayari[]>("/shayari");
        setData(res.data);
    };


    const stripHtml = (html: string) => {
        return html
            .replace(/<br\s*\/?>/gi, "\n")
            .replace(/<\/p>/gi, "\n")
            .replace(/<[^>]*>?/gm, "");
    };

    return (
        <ScrollView>
            {data.map((s) =>{
                console.log(s.content);
               return (
                <View
                    key={s.id}
                    style={{
                        backgroundColor: "#fff",
                        padding: 12,
                        borderRadius: 10,
                        marginBottom: 12,
                    }}
                >
                    <RenderHTML
                        contentWidth={width}
                        source={{
                            html: s.content.replace(/<div>/g, "<p>").replace(/<\/div>/g, "</p>")
                        }}
                        tagsStyles={{
                            p: { fontSize: 16 },
                            b: { fontWeight: "bold" },
                            i: { fontStyle: "italic" },
                        }}
                    />
                </View>
            )
            })}
        </ScrollView>
    );
}