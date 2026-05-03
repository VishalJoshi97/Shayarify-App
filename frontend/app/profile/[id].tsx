import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import ProfileHeader from "../../src/components/ProfileHeader";
import BioSection from "../../src/components/BioSection";
import QuoteRotator from "../../src/components/ QuoteRotator";
import MusicPlayer from "../../src/components/MusicPlayer";

import { getProfileById } from '../../src/api/profileApi';
import FollowButton from "../../src/components/follow/FollowButton";
import {useAuth} from "../../src/hooks/useAuth";
import { router } from "expo-router";
import {checkFollowApi, followApi, unfollowApi} from "../../src/api/followApi";
import {getFollowersCountApi, getFollowingCountApi} from "../../src/api/followApi";

import { themes } from "../../src/theme/themes";
import { useTheme } from "../../src/theme/ThemeContext";
import MessageButton from "../../src/components/message/MessageButton";

export default function UserProfile() {
    const { theme, setTheme } = useTheme();
    // @ts-ignore
    const currentTheme = themes[theme];

    const [profile, setProfile] = useState({
        bio: "",
        imageUrl: "",
        username: "",
    });

    //testing follower and following
    const { id } = useLocalSearchParams();
    const { user } = useAuth();
     const currentUserId = user?.id;
     const targetUserId=Number(id);

    const [isFollowing, setIsFollowing] = useState(false);

    const isOwnProfile = currentUserId === targetUserId;

    const follow = async () => {
        await followApi({
            followerId: currentUserId!,
            followingId: targetUserId,
        });
        setIsFollowing(true);
        fetchCounts();//on every follow
    };

    const unfollow = async () => {
        await unfollowApi({
            followerId: currentUserId!,
            followingId: targetUserId,
        });
        setIsFollowing(false);
        fetchCounts();//on every unfollow
    };


    useEffect(() => {
        fetchProfile();
    }, [id]);

    const fetchProfile = async () => {
        try {
            if (!id) return;

            const res = await getProfileById(Number(id));
            setProfile(res);
        } catch (err) {
            console.log("Error loading profile", err);
        }
    };


//testing count followers,following
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    useEffect(() => {
        if (!targetUserId) return;

        fetchCounts();
    }, [targetUserId]);


    const fetchCounts = async () => {
        try {
            const [followers, following] = await Promise.all([
                getFollowersCountApi(targetUserId!),//trust me bro!!
                getFollowingCountApi(targetUserId!),
            ]);

            setFollowersCount(followers);
            setFollowingCount(following);
        } catch (e) {
            console.log("Count error", e);
        }
    };

    // check follower  and unfollow
    useEffect(() => {
        if (!currentUserId || !targetUserId) return;

        checkFollowStatus();
    }, [currentUserId, targetUserId]);


    const checkFollowStatus = async () => {
        try {
            const res = await checkFollowApi(currentUserId!, targetUserId);
            setIsFollowing(res);
        } catch (e) {
            console.log("Follow check error", e);
        }
    };

    return (
        <LinearGradient
            colors={[
                currentTheme.background,
                currentTheme.background,
                "#000",]}
            style={styles.container}
        >
            <ProfileHeader
                username={profile.username || "User"}
                profile={profile}
                saveProfile={async () => {}} // ❌ disable editing for other users
                isEditable={false}
            />

            {/*testing follower and following*/}
            {/*testing count followers,following*/}
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginVertical: 15 }}>

                <TouchableOpacity onPress={() => router.push(`/followers/${targetUserId}`)}>
                    <Text style={{ color: currentTheme.text, fontWeight: "bold", fontSize: 16 }}>
                        {followersCount}
                    </Text>
                    <Text style={{ color: currentTheme.text, textAlign: "center" }}>
                        Followers
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push(`/following/${targetUserId}`)}>
                    <Text style={{ color:currentTheme.text, fontWeight: "bold", fontSize: 16 }}>
                        {followingCount}
                    </Text>
                    <Text style={{ color:currentTheme.text, textAlign: "center" }}>
                        Following
                    </Text>
                </TouchableOpacity>

            </View>

            <View style={{ flexDirection: "row", gap: 8 }}>
            {!isOwnProfile && (
                <FollowButton
                    isFollowing={isFollowing}
                    onFollow={follow}
                    onUnfollow={unfollow}
                />
            )}
    
            {/*Message*/}
                {!isOwnProfile &&(
                    <MessageButton userId={targetUserId}/>
                )}
            </View>

            <BioSection
                profile={profile}
                saveProfile={async() => {}} // ❌ disable editing
                isEditable={false}
            />

            <QuoteRotator />
            <MusicPlayer />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 16,
    },
});