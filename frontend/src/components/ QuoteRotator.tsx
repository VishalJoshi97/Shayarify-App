import { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { quotes } from "../data/quotes";

export default function QuoteRotator() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % quotes.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return <Text style={styles.quote}>{quotes[index]}</Text>;
}

const styles = StyleSheet.create({
    quote: {
        marginTop: 18,
        textAlign: "center",
        color: "#d4af37",
        fontStyle: "italic",
        fontSize: 13,
        opacity: 0.85,
    },
});