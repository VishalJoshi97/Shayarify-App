import { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { getFollowersApi } from "../../api/followApi";
import UserItem from "./UserItem";

import { useTheme } from "../../theme/ThemeContext";
import { themes } from "../../theme/themes";


export default function FollowersList({ userId }:any) {
    const { theme } = useTheme();
    const currentTheme:any = themes[theme];

    const [followers, setFollowers] = useState();

    useEffect(() => {
        if (!userId) return;
        fetchFollowers();
    }, [userId]);

    const fetchFollowers = async () => {
        try {
            const res = await getFollowersApi(userId);
            console.log("GET FOLLOWERS:",res)
            setFollowers(res);
        } catch (e) {
            console.log("Error fetching followers", e);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: currentTheme.background }}>
            <Text
                style={{
                    color:currentTheme.text,
                    marginLeft: 12,
                    fontSize: 16,
                    fontWeight: "500",
                    marginTop:50
                }}>Followers</Text>
            <FlatList
                data={followers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                    <UserItem user={item} />
            }
                ListEmptyComponent={
                    <Text style={{color: currentTheme.text, textAlign: "center", marginTop: 20 }}>
                        No followers yet
                    </Text>
                }
            />
        </View>
    );
}