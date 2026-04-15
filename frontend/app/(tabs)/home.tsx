import { View, Text, Button } from "react-native";
import { useAuth } from "../src/hooks/useAuth";

export default function Home() {
    const { logout } = useAuth();

    return (
        <View>
            <Text>Home Screen</Text>
            <Button title="Logout" onPress={logout} />
        </View>
    );
}