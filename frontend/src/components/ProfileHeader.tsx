import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

type Props = {
    username: string;
    profile: {
        bio: string;
        imageUrl: string;
    };
    saveProfile: (updated: any) => Promise<void>;
    isEditable: boolean;
};

//for own as well as others
//edit-> Pick image and save
//!edit-> show as profile image
export default function ProfileHeader({ username, profile, saveProfile ,isEditable}: Props) {
    const [tempImage, setTempImage] = useState<string | null>(null);
    const [editing, setEditing] = useState(false);

    // 📸 Pick Image
    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            alert("Permission required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setTempImage(result.assets[0].uri);
            setEditing(true); // start editing after picking
        }
    };

    // 💾 Save Image
    const handleSave = async () => {
        if (!tempImage) alert("Image was not captured!");
        if (!isEditable) return;
        //update image only
        const updated = {
            ...profile,
            imageUrl: tempImage,
        };

        await saveProfile(updated);

        //change states back to original->no editing
        setEditing(false);
        setTempImage(null);
    };

    // ❌ Cancel Image
    const handleCancel = () => {
    //change states back to original->no editing
        setEditing(false);
        setTempImage(null);
    };

    //display as header after save
    // ✅ Always prefer temp image if exists
    const displayImage = tempImage || profile.imageUrl;

    const image = displayImage?.trim()
        ? displayImage
        : "https://via.placeholder.com/150";

    return (
        <View style={styles.header}>

            {/* Avatar */}
            <TouchableOpacity
                onPress={isEditable? pickImage:undefined}
                activeOpacity={isEditable ? 0.7:1}
                style={styles.avatarContainer}
            >
                <Image source={{ uri: image }} style={styles.avatar} />


                {/* Camera Icon */}
                {isEditable &&
                <View style={styles.overlay}>
                    <Text style={styles.overlayIcon}>📷</Text>
                </View>
                }
            </TouchableOpacity>

            {/* Username */}
            <Text style={styles.username}>{username || "User"}</Text>

            {/* Save / Cancel */}
            {editing && (
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        marginBottom: 30,
    },

    avatarContainer: {
        position: "relative",
    },

    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1.5,
        borderColor: "#d4af37",
    },

    overlay: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#d4af37",
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.9,
    },

    overlayIcon: {
        fontSize: 14,
    },

    username: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
        marginTop: 12,
    },

    buttonRow: {
        flexDirection: "row",
        gap: 10,
        marginTop: 15,
    },

    saveBtn: {
        backgroundColor: "#d4af37",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },

    saveText: {
        color: "#000",
        fontWeight: "600",
    },

    cancelBtn: {
        borderWidth: 1,
        borderColor: "#444",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },

    cancelText: {
        color: "#aaa",
    },
});