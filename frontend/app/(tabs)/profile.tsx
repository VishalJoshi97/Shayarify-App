import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { useAuth } from "../../src/hooks/useAuth";
import { getProfile, updateProfile } from "../../src/api/profileApi";
import {FontAwesome, Ionicons} from '@expo/vector-icons';

import ProfileHeader from "../../src/components/ProfileHeader";
import BioSection from "../../src/components/BioSection";
import QuoteRotator from "../../src/components/ QuoteRotator";
import MusicPlayer from "../../src/components/MusicPlayer";

export default function Profile() {
    const { user ,logout} = useAuth();

    const [profile, setProfile] = useState({
        bio: "",
        imageUrl: "",
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const res = await getProfile();
        setProfile(res.data);
    };

    const saveProfile = async (updated: any) => {
        await updateProfile(updated);
        setProfile(updated);
    };

    return (
        <LinearGradient
            colors={["#0a0a0a", "#121212", "#000"]}
            style={styles.container}
        >
             <ProfileHeader
                username={user?.username || "User"}
                profile={profile}
                saveProfile={saveProfile}
                isEditable={true}
            />

            <BioSection
                profile={profile}
                saveProfile={saveProfile}
                isEditable={true}
            />

            <QuoteRotator />
            <MusicPlayer />
            <TouchableOpacity
                onPress={logout}
                style={{
                    marginTop: 20,
                    padding: 10,
                    alignItems: "center"
                }}
            >
                {/*<Text style={{ color: "red", fontWeight: "500" }}>*/}
                {/*    Logout*/}
                {/*</Text>*/}
                <Ionicons name="log-out" size={24} color="blue" />

            </TouchableOpacity>
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