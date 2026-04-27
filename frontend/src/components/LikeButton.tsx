import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { toggleLikeApi, getLikesApi } from "../api/likeApi";

type LikeButtonProps = {
    postId: number;
};

export default function LikeButton({ postId }: LikeButtonProps) {
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        loadLikes();
    }, [postId]);

    const loadLikes = async () => {
        const data = await getLikesApi(postId);
        // console.log("Like Data",data);
        setCount(data.count);
        setLiked(data.liked); // optional if backend supports
    };

    const handleLike = async () => {
        try {
            const data = await toggleLikeApi(postId);
            // const data = await res.json();

            setLiked(data.liked);
            setCount(data.count);

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <TouchableOpacity onPress={handleLike}>
            <Text style={{ fontSize: 18 }}>
                {liked ? "❤️" : "🤍"} {count}
            </Text>
        </TouchableOpacity>
    );
}