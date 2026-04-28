import Client from "./client";
import { Comment } from "../types/comment";

export const getCommentsApi = async (postId: number): Promise<Comment[]> => {
    const res = await Client.get(`/comments/${postId}`);
    return res.data;
};

export const addCommentApi = async (
    postId: number,
    content: string
) => {
    return Client.post("/comments", {
        postId,
        content,
    });
};