import { useEffect } from "react";

export default function OAuthSuccess() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            console.log("JWT:", token);

            // save token
            localStorage.setItem("token", token);

            // redirect to feed
            window.location.href = "/(tabs)/feed";
        }
    }, []);

    return <h2>Logging you in...</h2>;
}