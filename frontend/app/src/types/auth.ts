import {User} from "@/app/src/types/user";

export type AuthContextType = {
    token: string | null;
    user: User | null;
    loading: boolean;
    login: (token: string, user: User) => Promise<void>;
    logout: () => Promise<void>;
};