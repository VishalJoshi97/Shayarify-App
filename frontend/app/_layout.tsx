import { Stack } from "expo-router";
import { AuthProvider } from "./src/context/AuthContext";
import {loadFonts} from "@/app/src/hooks/useFonts";
import {useEffect, useState} from "react";

//Skeletal structure of the app
export default function RootLayout() {
    const [ready, setReady] = useState(false);

    //just loading fonts when app opens
    useEffect(() => {
        const init = async () => {
            await loadFonts();
            setReady(true);
            console.log("READY TO GO! APP HAS BEEN STARTED....");
        };

        init();
    }, []);

    if (!ready) return null; // or loader

//Wrap with auth provider from auth context
  return (
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
  );
}