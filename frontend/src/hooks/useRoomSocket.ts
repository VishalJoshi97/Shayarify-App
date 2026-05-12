import { useEffect } from "react";

import {
    connectRoomSocket,
    disconnectRoomSocket,
} from "@/websocket/roomSocket";

export default function useRoomSocket(
    roomCode: string,
    token: string,
    onMessageReceived: (message: any) => void
) {

    useEffect(() => {

        connectRoomSocket(
            token,
            roomCode,
            onMessageReceived
        );

        return () => {
            disconnectRoomSocket();
        };

    }, []);
}