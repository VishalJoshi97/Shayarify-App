import {
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

interface Props {
    value: string;
    onChange: (text: string) => void;
    onSend: () => void;
    currentTheme: any;
}

export default function ChatInput({
                                      value,
                                      onChange,
                                      onSend,
                                      currentTheme,
                                  }: Props) {

    return (
        <View
            style={{
                flexDirection: "row",
                paddingHorizontal: 10,
                paddingVertical: 8,

                backgroundColor:
                currentTheme.background,

                borderTopWidth: 0.5,
                borderColor: "#ddd",

                marginBottom: 32,
            }}
        >

            <TextInput
                value={value}
                onChangeText={onChange}

                placeholder="Share a thought..."

                placeholderTextColor="#777"

                style={{
                    flex: 1,

                    borderWidth: 0.5,
                    borderColor: "#ccc",

                    borderRadius: 20,

                    paddingHorizontal: 12,
                    paddingVertical: 5,

                    marginRight: 8,

                    color: currentTheme.text,
                }}
            />

            <TouchableOpacity
                onPress={onSend}

                style={{
                    width: 48,
                    height: 48,

                    borderRadius: 24,

                    backgroundColor:
                    currentTheme.primary,

                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Ionicons
                    name="send"
                    size={20}
                    color="#fff"
                />
            </TouchableOpacity>

        </View>
    );
}