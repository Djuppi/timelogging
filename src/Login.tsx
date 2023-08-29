import { FaUser } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

//import Layout from '@/components/Layout';
import React from 'react';
import { useAuth } from './useAuth';
//import styles from '@/styles/AuthForm.module.css';

export default function LoginPage() {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login({username, password})  
    }

    return (
        
            <div>
                <h1>
                    <FaUser /> Log in
                </h1>
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='username'>Brukernavn</label>
                        <input
                            type='text'
                            id='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <input className="btn" type="submit" value="Login" />
                </form>
                <a href="/account/register">Opprett bruker</a>
            </div>
    
    )
}