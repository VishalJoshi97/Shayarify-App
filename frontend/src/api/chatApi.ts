import Client from "./client"; // your axios instance

export const getChatApi = async (receiverId: number) => {
    const res = await Client.get(`/chat/${receiverId}`);
    return res.data;
};

export const sendMessageApi = async (receiverId: number, content: string) => {
    const res = await Client.post("/chat/send", {
        receiverId,
        content,
    });
    return res.data;
};

export const getConversationsApi = async () => {
    const res = await Client.get("/chat/conversations");
    return res.data;
};