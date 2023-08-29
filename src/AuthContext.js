import { createContext, useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { useNavigate, useLocation } from 'react-router-dom';
//import { NEXT_URL } from '@/config/index';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState(null);
    const [userEvents, setUserEvents] = useState(null);
    const [allUsers, setAllUsers] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        CheckUserLogginIn();
    }, []);


    // Register User
    const register = async (user) => {


        if(typeof window !== 'undefined') {
            
            const prevStore = JSON.parse((localStorage.getItem('all_users')));
            console.log(prevStore)

            const userObj = {
                username: user.username,
                password: CryptoJS.AES.encrypt(user.password, '123').toString(), 
            }

            if(prevStore) {
                prevStore.push(userObj);
                localStorage.setItem('all_users', JSON.stringify(prevStore));
            } else {
                const userArr = [];
                userArr.push(userObj);
                localStorage.setItem('all_users', JSON.stringify(userArr));
            }
            localStorage.setItem('this_user', JSON.stringify(userObj));
            localStorage.setItem('loggedIn', JSON.stringify(true));
            setUser(userObj);
            setLoggedIn(true);
           navigate.push('/account/welcome');
        } else {
            setError("kunne ikke oprette bruker");
        }
        
    }

    // Login User
    const login = async ({username, password}) => {
        setError(false);

        let storedUsers;

        if(typeof window !== 'undefined') {
            storedUsers = JSON.parse((localStorage.getItem('all_users')));
        }
        
        if(storedUsers) {
            storedUsers.map(user => {
                const decryptedPassword = CryptoJS.AES.decrypt(user.password, '123').toString(CryptoJS.enc.Utf8);
                if(user.username === username && password === decryptedPassword) {
                    if(typeof window !== 'undefined') {
                        localStorage.setItem('loggedIn', JSON.stringify(true))
                        localStorage.setItem('this_user', JSON.stringify(user))
                    }
                    setLoggedIn(true);
                    setUser(user);
                    setError(null);
                    navigate('/account/welcome');
                } else if(user.username === username) {
                    setError('Passord er feil')
                } else {
                    setError('Brukernavn er feil')
                }
            }) 
        }
    }

    // Logout User
    const logout = async (e) => {
        e.preventDefault();
        if(typeof window !== 'undefined') {
            localStorage.setItem('loggedIn', JSON.stringify(false))
            localStorage.removeItem('this_user');

            setUser(null);
            navigate('/account/login');
        }
        
    }

    // Check if user is logged in
    const CheckUserLogginIn = () => {
            const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
            const user = JSON.parse(localStorage.getItem('this_user'));
            
            if(loggedIn) {
                setUser(user);
            } else {
                location !== '/account/register' && navigate('/account/login');
            }
    }

    return (
        <AuthContext.Provider value={{user, userEvents, error, register, login, logout, CheckUserLogginIn, loggedIn}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;