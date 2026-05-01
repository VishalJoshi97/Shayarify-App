import React from "react";
// import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";

// 🔥 define props type
type OAuthProps = {
    mode: "Login" | "Sign-Up";
};

const OAuth: React.FC<OAuthProps> = ({ mode }) => {
    const handleGoogle = () => {
        window.location.href =
            "http://localhost:8080/oauth2/authorization/google";
    };

    const handleGithub = () => {
        window.location.href =
            "http://localhost:8080/oauth2/authorization/github";
    };

    return (
        <div>
            <h2>
                Or Else {mode === "Login" ? "Login" : "Sign-Up"} with
            </h2>

            <div>
                <button onClick={handleGoogle}>
                    {/*<FcGoogle />*/}
                    {mode} with Google
                </button>

                <br />

                <button onClick={handleGithub}>
                    {/*<FaGithub /> */}
                    {mode} with GitHub
                </button>
            </div>
        </div>
    );
};

export default OAuth;