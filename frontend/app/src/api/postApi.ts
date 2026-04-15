import Client from "./client";

type PostPayload = {
    content: string;
    category: string;
    language: string;
};

export const createPost = async (data: PostPayload) => {
    const res = await Client.post("/shayari", data);
    return res.data;
};

//Editor
export const createPostApi = (data: {
    title: string;
    content: string;
}) => {
    return Client.post("/shayari/post", data);
};