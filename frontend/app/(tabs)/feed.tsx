import {FlatList, Text, useWindowDimensions} from "react-native";
import {useCallback, useState} from "react";
import Client from "../../src/api/client";
import { Shayari } from "../../src/types/shayari";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import {useAuth} from "../../src/hooks/useAuth";
import PostCard from "../../src/components/PostCard";

export default function Feed() {
    const { user } = useAuth();
    // const myId = user?.id;

    const [data, setData] = useState<Shayari[]>([]);//Shayari Types
    // const { width } = useWindowDimensions();

    //Pagination
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useFocusEffect(
        useCallback(() => {
            fetchData(0); // 🔥 runs when screen is focused
        }, [])
    );


    // const openChat = (userId: number) => {
    //     router.push({
    //         pathname: "/chat/[userId]",
    //         params: {
    //             userId: userId.toString(), // 🔥 REQUIRED
    //             receiverId: userId.toString(),
    //         },
    //     });
    // };

    const fetchData = async (pageNumber: number) => {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            const res = await Client.get(
                `/post?page=${pageNumber}&size=5`//PostResponse
            );

            const newData = res.data.content;

            setData((prev) =>
                pageNumber === 0
                    ? newData
                    : [...prev, ...newData]
            );

            setHasMore(!res.data.last);
            setPage(pageNumber + 1);

        } catch (err) {
            console.log("FETCH ERROR: ",err);
        }

        setLoading(false);
    };

    return (
        <FlatList
            data={data}//chose the object

            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 12 }}
            // renderItem={({ item }) => {
            //
            //     const cleanHtml = item.content
            //         .replace(/<div>/g, "<p>")
            //         .replace(/<\/div>/g, "</p>")
            //         .replace(/&nbsp;/g, " "); // 🔥 FIX
            //
            //     return(
            //         <View
            //             style={{
            //                 backgroundColor: "#fff",
            //                 padding: 12,
            //                 borderRadius: 10,
            //                 marginBottom: 12,
            //             }}
            //         >
            //
            //             <RenderHTML
            //                 contentWidth={width}
            //                 source={{ html: cleanHtml }}
            //             />
            //
            //             <LikeButton postId={item.id} />
            //             <Button title="Chat" onPress={() => openChat(item.userId)} />
            //
            //         </View>
            //     )
            // }}
            renderItem={({ item }) => <PostCard item={item} />}

            onEndReached={()=>fetchData(page)}              // 🔥 pagination trigger
            onEndReachedThreshold={0.3}


            ListFooterComponent={
                loading ? <Text>Loading...</Text> : null
            }
        />
    );
}