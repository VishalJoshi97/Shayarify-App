import {User} from "../types/user";
export type Profile = {
    imageUrl: string;
    bio: string;
};

export type AuthContextType = {
    token: string | null;
    user: User | null;
    loading: boolean;
    login: (token: string, user: User) => Promise<void>;
    logout: () => Promise<void>;
    profile: Profile | null;
    setProfile: (profile: Profile) => void;
};