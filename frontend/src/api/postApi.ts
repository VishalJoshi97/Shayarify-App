import Client from "./client";

type PostPayload = {
    title: string;
    language: string;
    content: string;
};

//Editor
export const createPost = (data:PostPayload
 ) => {
    return Client.post("/post", data);
};

//get post count
export const getPostCount=async (userId:number)=>{
    const res= await Client.get(`/post/count/${userId}`);
    return res.data
}

export const fetchMyPosts = async (page: number, size: number) => {
    // Note: We use the /user endpoint you just created
    const response = await Client.get(`/post/user?page=${page}&size=${size}`);
    return response.data;
};