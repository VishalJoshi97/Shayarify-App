import client from "./client";
import {ProfileId, ProfileType} from "@/app/src/types/profile";

export const createProfile = async (profileRequest:ProfileType) => {
   const res=await client.post("/profile/create",profileRequest);
   return res.data;
}

export const getProfile = async () => {
    const res=await client.get("/profile/get");
    return res;
}

export const updateProfile = async (update:ProfileType) => {
   const res=await client.put("/profile/update",update);
    console.log("UPDATED PROFILE DATA :",res.data)
   return res.data;
}

export const getProfileById = async (id:number) => {
    const res=await client.get(`/profile/get/${id}`);
    console.log("SPECIFIC PROFILE : ",res.data)
    return res.data;
}