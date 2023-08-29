import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//import ErrorPage from './ErrorPage';
import Home from './Home';
import LoginPage from './Login.tsx';
import { AuthContext } from './context/AuthContext.tsx';
import { useAuth } from './useAuth.ts';
import { useUser } from './useUser.ts';
import React from 'react';

const App = () => {
    const { user } = useAuth();
    const { setUser } = useUser();

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={ <Home /> }
                    />
                    {/* The next line is very important for the Navigate component to work */}
                    <Route
                        path="/login"
                        element={ <LoginPage /> }
                    />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
        
    );
}
export default App;