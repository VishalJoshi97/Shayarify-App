import Client from "./client";

export const getAllRooms = async () => {

    const response =
        await Client.get("/rooms");

    return response;
};

export const getRoom = async (
    roomCode: string
) => {

    const response =
        await Client.get(
            `/rooms/${roomCode}`
        );

    return response;
};

export const createRoom = async (
    roomName: string
) => {

    const response =
        await Client.post(
            "/rooms",
            {
                roomName,
            }
        );

    return response;
};

export const joinRoom = async (
    roomCode: string
) => {

    const response =
        await Client.post(
            "/rooms/join",
            {
                roomCode,
            }
        );

    return response;
};

export const leaveRoom = async (
    roomCode: string
) => {

    const response =
        await Client.delete(
            `/rooms/${roomCode}/leave`
        );

    return response;
};

export const getRoomMessages = async (
    roomCode: string
) => {

    const response =
        await Client.get(
            `/rooms/${roomCode}/messages`
        );

    return response;
};

export const sendRoomMessage = async (
    roomCode: string,
    content: string
) => {

    const response =
        await Client.post(
            `/rooms/${roomCode}/messages`,
            {
                content,
            }
        );

    return response;
};