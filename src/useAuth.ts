import { useEffect } from "react";
import { useUser } from "./useUser";
import { User } from "./types";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
    const { user, addUser, loginUser } = useUser();
    const { getItem, setItem } = useLocalStorage();

    useEffect(() => {
        const user = getItem("user");
        if(user) {
            setItem("isLoggedIn", JSON.stringify(true));
        }
    }, []);

    const login = (user: User) => {
        loginUser(user);
    };

    const logout = () => {
        setItem("isLoggedIn", JSON.stringify(false));
    }

    return { user, login, logout };
}
