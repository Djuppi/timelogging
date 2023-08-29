import { createContext } from "react";
import { User } from "../types";

interface AuthContext {
    user: User | null;
    setUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContext>({
    user: null,
    setUser: () => {},
});