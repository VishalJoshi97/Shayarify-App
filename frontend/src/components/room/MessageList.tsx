import { FlatList } from "react-native";

import MessageBubble from "./MessageBubble";

interface Props {
    messages: any[];
    currentTheme: any;
}

export default function MessageList({
                                        messages,
                                        currentTheme,
                                    }: Props) {

    return (

        <FlatList
            data={messages}

            keyExtractor={(item, index) =>

                item?.id
                    ? `msg-${item.id}`

                    : `temp-${item.sentAt}-${index}`
            }

            contentContainerStyle={{
                paddingHorizontal: 10,
                paddingTop: 4,
                paddingBottom: 10,
            }}

            renderItem={({ item }) => (

                <MessageBubble
                    item={item}
                    currentTheme={currentTheme}
                />

            )}
        />

    );
}