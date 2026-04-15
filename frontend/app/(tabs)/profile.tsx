import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { getProfile } from "../src/api/profileApi";

export default function Profile() {
    const [data, setData] = useState("");

    useEffect(() => {
        getProfile().then((res) => setData(res.data));
    }, []);

    return (
        <View>
            <Text>{data}</Text>
        </View>
    );
}