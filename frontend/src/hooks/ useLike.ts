import { useEffect, useState } from "react";

import {
    getLikesApi,
    toggleLikeApi,
} from "@/api/likeApi";

export default function useLike(postId: number) {
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadLikes();
    }, [postId]);

    const loadLikes = async () => {
        try {
            const data = await getLikesApi(postId);

            setLiked(data.liked);
            setCount(data.count);

        } catch (e) {
            console.log(e);
        }
    };

    const toggleLike = async () => {
        if (loading) return;

        try {
            setLoading(true);

            const optimisticLiked = !liked;

            setLiked(optimisticLiked);
            setCount(prev =>
                optimisticLiked ? prev + 1 : prev - 1
            );

            //like-unlike
            const data = await toggleLikeApi(postId);

            setLiked(data.liked);
            setCount(data.count);

        } catch (e) {
            console.log("Like Post Error",e);

        } finally {
            setLoading(false);
        }
    };

    return {
        liked,
        count,
        toggleLike,
        loading,
    };
}