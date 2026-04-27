import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useTypingEffect } from "../hooks/useTypingEffect";

type Props = {
    profile: {
        bio: string;
        imageUrl: string;
    };
    saveProfile: (updated: any) => Promise<void>;
    isEditable: boolean;
};

//used for own as well as others profile
//prop based component
export default function BioSection({ profile, saveProfile,isEditable }: Props) {
    const [bio, setBio] = useState("");
    const [tempBio, setTempBio] = useState("");
    const [editing, setEditing] = useState(false);

    const typedBio = useTypingEffect(bio || "“Write something soulful…”");

    // fetch profile initially
    // useEffect(() => {
    //     fetchProfile();
    // }, []);
    //
    // const fetchProfile = async () => {
    //     const res = await getProfile();
    //     setBio(res.data.bio || "");
    // };

    useEffect(() => {
        setBio(profile.bio || "");
    }, [profile]);

    const handleEdit = () => {
        setTempBio(bio);
        setEditing(true);
    };

    // const handleSave = async () => {
    //     const res = await getProfile();
    //
    //     await updateProfile({
    //         bio: tempBio,
    //         imageUrl: res.data.imageUrl, // ✅ keep existing image
    //     });
    //
    //     setBio(tempBio);
    //     setEditing(false);
    // };

    const handleSave = async () => {
        if (!isEditable || !saveProfile) return;

        await saveProfile({
            bio: tempBio,
            imageUrl: profile.imageUrl, // use prop, not API
        });

        setBio(tempBio);
        setEditing(false);
    };

    const handleCancel = () => {
        setEditing(false);
    };

    return (
        <View style={styles.card}>

            {!editing ? (
                <>
                    <Text style={styles.bio}>{typedBio}</Text>
                    {isEditable &&
                    <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
                        <Text style={styles.editText}>Edit Bio</Text>
                    </TouchableOpacity>
                    }
                </>
            ) : (
                <>
                    <TextInput
                        style={styles.input}
                        value={tempBio}
                        onChangeText={setTempBio}
                        placeholder="Write your shayari..."
                        placeholderTextColor="#777"
                        multiline
                    />

                    <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleCancel}>
                        <Text style={styles.cancel}>Cancel</Text>
                    </TouchableOpacity>
                </>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        backgroundColor: "#1a1a1a",
        borderRadius: 16,
        padding: 16,
        marginTop: 10,

        // subtle depth
        borderWidth: 1.5,
        borderColor: "#333",
    },
    container: {
        width: "100%",
        alignItems: "center",
    },
    bio: {
        color: "#e0e0e0",
        fontSize: 15,
        textAlign: "center",
        fontStyle: "italic",
        lineHeight: 22,
    },
    editBtn: {
        marginTop: 14,
        alignSelf: "center",
        paddingVertical: 6,
        paddingHorizontal: 18,
        borderRadius: 20,
        backgroundColor: "#222",
    },
    editText: {
        color: "#d4af37",
        fontWeight: "500",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#333",
        backgroundColor: "#1a1a1a",
        color: "#fff",
        borderRadius: 10,
        padding: 12,
        marginTop: 10,
    },
    saveBtn: {
        backgroundColor: "#d4af37",
        marginTop: 10,
        padding: 10,
        borderRadius: 20,
        width: "100%",
        alignItems: "center",
    },
    saveText: {
        color: "#000",
        fontWeight: "bold",
    },
    cancel: {
        marginTop: 10,
        color: "#777",
        textAlign: "center",
        marginBottom: -10,
    },
});