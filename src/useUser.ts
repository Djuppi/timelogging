import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useLocalStorage } from "./useLocalStorage";
import { User } from "./types";
import { toast } from "react-toastify";

export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);
    const { setItem, getItem } = useLocalStorage();

    const addUser = (user: User) => {
        const prevStore = getItem("all_users");
        const parsedStore = prevStore && JSON.parse(prevStore);
        
        // Checks if the user exist an toast an error
        const userExists = parsedStore?.find(storedUser => user.username === storedUser.username);
        if(userExists) {
            toast.error("User already exists, login if that is you!");
            return;
        }

        const userObj = {
            username: user.username,
            password: CryptoJS.AES.encrypt(user.password, '123').toString(), 
        };

        if(prevStore) {
            JSON.parse(prevStore).push(userObj);
            localStorage.setItem('all_users', JSON.stringify(prevStore));
        } else {
            const userArr : User[] = [];
            userArr.push(userObj);
            localStorage.setItem('all_users', JSON.stringify(userArr));
        }

        setUser(userObj);
        setItem("user", JSON.stringify(user.username));
        setItem("isLoggedIn", JSON.stringify(true));
    }

    const loginUser = (user: User) => {

        const storedUsers = getItem("all_users");

        if(storedUsers) {
            const parsedStoreUsers = JSON.parse(storedUsers);
            parsedStoreUsers.map(storedUser => {
                const decryptedPassword = CryptoJS.AES.decrypt(storedUser.password, '123').toString(CryptoJS.enc.Utf8);
                if(storedUser.username === user.username && user.password === decryptedPassword) {
                    if(typeof window !== 'undefined') {
                        localStorage.setItem('loggedIn', JSON.stringify(true))
                        localStorage.setItem('this_user', JSON.stringify(storedUser))
                    }
                    setItem("isLoggedIn", JSON.stringify(true));
                    setUser(storedUser);
                    //router.push('/account/welcome');
                } else if(storedUser.username === user.username) {
                    toast.error('Passord er feil')
                } else {
                    toast.error('Brukernavn er feil')
                }
            }) 
        } else {
            toast.error('Bruker finnes ikke')
        }
    }

    return { user, addUser, loginUser, setUser };
}