import { Stack } from "expo-router";
import { AuthProvider } from "./src/context/AuthContext";
import {loadFonts} from "@/app/src/hooks/useFonts";
import {useEffect, useState} from "react";

export default function RootLayout() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const init = async () => {
            await loadFonts();
            setReady(true);
            console.log("Ready!");
        };

        init();
    }, []);

    if (!ready) return null; // or loader

    // return <Slot />;

  return (
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
  );
}