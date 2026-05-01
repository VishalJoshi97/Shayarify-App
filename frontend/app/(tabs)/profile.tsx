import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {useCallback, useEffect, useState} from "react";
import { useAuth } from "../../src/hooks/useAuth";
import { getProfile, updateProfile } from "../../src/api/profileApi";
import { Ionicons } from "@expo/vector-icons";

import ProfileHeader from "../../src/components/ProfileHeader";
import BioSection from "../../src/components/BioSection";
import QuoteRotator from "../../src/components/ QuoteRotator";
import MusicPlayer from "../../src/components/MusicPlayer";

import { router } from "expo-router";
import {
    getFollowersCountApi,
    getFollowingCountApi,
} from "../../src/api/followApi";
import {useFocusEffect} from "@react-navigation/native";

import { useTheme } from "../../src/theme/ThemeContext";
import { themes } from "../../src/theme/themes";
import {fetchMyPosts, getPostCount} from "../../src/api/postApi";
import PostCard from "../../src/components/PostCard";
import ProfilePostCard from "../../src/components/ProfilePostCard";


export default function Profile() {
    const { user, logout ,profile,setProfile} = useAuth();

    const { theme, setTheme } = useTheme();
    // @ts-ignore
    const currentTheme = themes[theme];
    const isSelected = theme === "dark";

    const currentUserId = user?.id; // ✅ only your user

    // const [profile, setProfile] = useState({
    //     bio: "",
    //     imageUrl: "",
    // });

    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);


    const [showThemeMenu, setShowThemeMenu] = useState(false);

    const [postCount, setPostCount] = useState(0);


    interface PageResponse<T> {
        content: T[];
        totalPages: number;
        totalElements: number;
        size: number;
        number: number; // current page index
        last:any
    }
    interface PostResponse {
        id: number;
        userId: number;
        username: string;
        title: string;
        language: string;
        content: string;
        createdAt: string; // ISO string from Backend
    }

    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadPosts(page);
    }, [page]);

    useEffect(() => {
        // @ts-ignore
        getPostCount(user.id).then(setPostCount);
    }, []);

    // 🔹 Fetch profile
    useEffect(() => {
        fetchProfile();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchCounts();
        }, [])
    );

    const fetchProfile = async () => {
        try {
            const res = await getProfile();
            setProfile(res.data);
        } catch (e) {
            console.log("Profile error", e);
        }
    };

    const saveProfile = async (updated: any) => {
        try {
            await updateProfile(updated);
            setProfile(updated);
        } catch (e) {
            console.log("Update error", e);
        }
    };

    // 🔹 Fetch counts (ONLY for current user)
    useEffect(() => {
        if (!currentUserId) return;

        fetchCounts();
    }, [currentUserId]);

    const fetchCounts = async () => {
        try {
            const [followers, following] = await Promise.all([
                getFollowersCountApi(currentUserId!),
                getFollowingCountApi(currentUserId!),
            ]);

            setFollowersCount(followers);
            setFollowingCount(following);
        } catch (e) {
            console.log("Count error", e);
        }
    };


    //own posts
    const loadPosts = async (page:number) => {
        if (loading || !hasMore) return;

        try {
            // Ensure fetchMyPosts matches your new controller (page, size)
            const data: PageResponse<PostResponse> = await fetchMyPosts(page, 5);

            const newData = data.content;

            setPosts((prev) =>
                page === 0
                    ? newData
                    : [...prev, ...newData]);

            setHasMore(!data.last);
            setPage(page + 1);
        } catch (error) {
            console.error("Failed to load posts", error);
        }
        setLoading(false);
    };

    return (
        <LinearGradient
            colors={[
                currentTheme.background,
                currentTheme.background,
                "#000",]}
            style={styles.container}
        >

            {/*Menu*/}
            <View
                style={{
                    position: "absolute",
                    top: 50,
                    left: 16,
                    zIndex: 20,
                }}
            >
                <TouchableOpacity
                    onPress={() => setShowThemeMenu(!showThemeMenu)}
                    activeOpacity={0.7}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",

                        backgroundColor: currentTheme.background,
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 20,

                        borderWidth: 1,
                        borderColor: currentTheme.primary,

                        // softer shadow
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowRadius: 6,
                        elevation: 3,
                    }}
                >
                    <Ionicons name="color-palette" size={24} color={currentTheme.primary} />
                    <Text style={{
                        marginLeft: 6,
                        fontSize: 13,
                        color:currentTheme.text}}>Themes</Text>
                </TouchableOpacity>
            </View>


            <ProfileHeader
                username={user?.username || "User"}
                profile={profile}
                saveProfile={saveProfile}
                isEditable={true}
            />

            {/*Post and Followers / Following Counts */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginVertical: 15,
                }}
            >
                {/*Post count*/}
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <View>
                        <Text style={{ color: currentTheme.text, fontWeight: "bold" }}>
                            {postCount}
                        </Text>
                        <Text style={{ color: "gray" }}>Posts</Text>
                    </View>
                </View>

                {/*Followers*/}
                <TouchableOpacity
                    onPress={() => router.push(`/followers/${currentUserId}`)}
                >
                    <Text style={{ color: currentTheme.text, fontWeight: "bold", fontSize: 16 }}>
                        {followersCount}
                    </Text>
                    <Text style={{ color: currentTheme.text, textAlign: "center" }}>
                        Followers
                    </Text>
                </TouchableOpacity>

                {/*Following*/}
                <TouchableOpacity
                    onPress={() => router.push(`/following/${currentUserId}`)}
                >
                    <Text style={{ color: currentTheme.text, fontWeight: "bold", fontSize: 16 }}>
                        {followingCount}
                    </Text>
                    <Text style={{ color: currentTheme.text, textAlign: "center" }}>
                        Following
                    </Text>
                </TouchableOpacity>
            </View>

            {/*Suggestion*/}
            <TouchableOpacity
                style={{
                    position: "absolute",
                    bottom: 100,
                    right: 20,
                    borderRadius: 50,
                    overflow: "hidden",
                }}
            >
                <LinearGradient
                    colors={["#ff7eb3", "#ff758c"]}
                    style={{
                        padding: 14,
                        borderRadius: 50,
                    }}
                >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        ✨ Inspire
                    </Text>
                </LinearGradient>
            </TouchableOpacity>


            <BioSection
                profile={profile}
                saveProfile={saveProfile}
                isEditable={true}
            />

            <QuoteRotator />
            <MusicPlayer />

                {/*Themes*/}
            {showThemeMenu && (
                <View
                    style={{
                        position: "absolute",
                        top: 100,
                        left: 16,
                        backgroundColor: currentTheme.background,
                        paddingVertical: 8,
                        paddingHorizontal: 2,
                        borderRadius: 12,

                        // dynamic border
                        borderWidth: 1,
                        borderColor: currentTheme.primary,

                        // shadow
                        shadowColor: "#000",
                        shadowOpacity: 0.2,
                        shadowRadius: 8,
                        elevation: 5,
                        zIndex: 20,
                    }}
                >
                    {/* DARK */}
                    <TouchableOpacity
                        onPress={() => {
                            setTheme("dark");
                            setShowThemeMenu(false);
                        }}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            padding: 8,
                            borderRadius: 8,
                            backgroundColor:
                                theme === "dark" ? currentTheme.primary + "22" : "transparent",
                        }}
                    >
                        <Ionicons name="moon" size={20} color="#9ca3af" />

                        <Text style={{ color: currentTheme.text, marginLeft: 8 }}>
                            Dark
                        </Text>

                        {theme === "dark" && (
                            <Ionicons
                                name="checkmark"
                                size={16}
                                color={currentTheme.primary}
                                style={{ marginLeft: "auto" }}
                            />
                        )}
                    </TouchableOpacity>

                    {/* LIGHT */}
                    <TouchableOpacity
                        onPress={() => {
                            setTheme("light");
                            setShowThemeMenu(false);
                        }}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            padding: 8,
                            borderRadius: 8,
                            backgroundColor:
                                theme === "light"
                                    ? currentTheme.primary + "33"
                                    : "transparent",
                        }}
                    >
                        <Ionicons name="sunny" size={20} color="#ff7a00" />

                        <Text style={{ color: currentTheme.text, marginLeft: 8 }}>
                            Light
                        </Text>

                        {theme === "light" && (
                            <Ionicons
                                name="checkmark"
                                size={16}
                                color={currentTheme.primary}
                                style={{ marginLeft: "auto" }}
                            />
                        )}
                    </TouchableOpacity>

                    {/* SHAYARIFY */}
                    <TouchableOpacity
                        onPress={() => {
                            setTheme("shayarify");
                            setShowThemeMenu(false);
                        }}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            padding: 8,
                            borderRadius: 8,
                            backgroundColor:
                                theme === "shayarify"
                                    ? "#c9a227" + "22"
                                    : "transparent",
                        }}
                    >
                        <Ionicons name="sparkles" size={20} color="#c9a227" />

                        <Text style={{ color: currentTheme.text, marginLeft: 8 }}>
                            Shayarify
                        </Text>

                        {theme === "shayarify" && (
                            <Ionicons
                                name="checkmark"
                                size={16}
                                color={currentTheme.primary}
                                style={{ marginLeft: "auto" }}
                            />
                        )}
                    </TouchableOpacity>
                </View>
            )}

            <View
                style={{
                    position: "absolute",
                    top: 50,
                    right: 16,
                    zIndex: 20,
                }}
            >
                <TouchableOpacity
                    onPress={logout}
                    activeOpacity={0.7}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",

                        backgroundColor: currentTheme.background,
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 20,

                        borderWidth: 1,
                        borderColor: currentTheme.primary,

                        // softer shadow
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowRadius: 6,
                        elevation: 3,
                    }}
                >
                    <Ionicons
                        name="log-out-outline"
                        size={20}
                        color={currentTheme.primary}
                    />

                    <Text
                        style={{
                            color: currentTheme.text,
                            marginLeft: 6,
                            fontSize: 13,
                        }}
                    >
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>


        {/*    Own posts*/}
        {/*    <FlatList*/}
        {/*        data={posts}*/}
        {/*        numColumns={3}*/}
        {/*        renderItem={({ item }) => <PostCard item={item} />}*/}
        {/*        onEndReached={()=>loadPosts(page)}*/}
        {/*        onEndReachedThreshold={0.3}*/}
        {/*    />*/}

            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ flex: 1 / 3 }}>
                        <ProfilePostCard item={item} />
                    </View>                )}
                showsVerticalScrollIndicator={false}
            />
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