import client from "./client";

export const loginApi = (data: { email: string; password: string }) =>
    client.post("/auth/login", data);

export const registerApi = (data: any) =>
    client.post("/auth/register", data);