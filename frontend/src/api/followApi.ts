import client from "./client";
import {FollowUserType,UnFollowUserType,GetFollowersType,GetFollowingType} from "../types/follow";

export const followApi=async ({followerId,followingId}:FollowUserType) => {
    const res=await client.post(`/follow/${followerId}/${followingId}`);//already as path variable
    console.log("FOLLOW USER: ",res.data)
   return  res.data
}

export const unfollowApi = async ({ followerId, followingId }: UnFollowUserType) => {
    const res = await client.delete(`/follow/${followerId}/${followingId}`);
    console.log("UNFOLLOW USER:", res.data);
    return res.data;
};

export const getFollowersApi = async (userId: number) => {
    const res = await client.get(`/follow/followers/${userId}`);
    // console.log("FOLLOWERS:", res.data);
    return res.data;
};

export const getFollowingApi = async (userId: number) => {
    const res = await client.get(`/follow/following/${userId}`);
    // console.log("FOLLOWING:", res.data);
    return res.data;
};


export const getFollowersCountApi = async (userId: number) => {
    const res = await client.get(`/follow/followers/count/${userId}`);
    return res.data as number;
};

export const getFollowingCountApi = async (userId: number) => {
    const res = await client.get(`/follow/following/count/${userId}`);
    return res.data as number;
};

//check
export const checkFollowApi = async (followerId: number, followingId: number) => {
    const res = await client.get(`/follow/check/${followerId}/${followingId}`);
    return res.data as boolean;
};