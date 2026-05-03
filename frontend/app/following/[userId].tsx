import { useLocalSearchParams } from "expo-router";
import FollowingList from "../../src/components/follow/FollowingList";

export default function FollowingScreen() {
    const { userId } = useLocalSearchParams();

    return <FollowingList userId={Number(userId)} />;
}