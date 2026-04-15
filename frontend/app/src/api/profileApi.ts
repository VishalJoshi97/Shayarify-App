import client from "./client";

export const getProfile = () => client.get("/profile/jwt");
export const getOAuthProfile = () => client.get("/profile/oauth");