import Client from "./client"

export const toggleLikeApi=async (postId:number)=>{
    const res=await Client.post(`/post/${postId}/like`)
    return res.data;// true/false
}

export const getLikesApi=async (postId:number)=>{
    const res=await Client.get(`/post/${postId}/likes`)
    return res.data;
}