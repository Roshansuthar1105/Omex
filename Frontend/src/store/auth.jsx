// Frontend/src/store/auth.jsx

import React, { createContext, useContext, useState } from 'react';

// Create AuthContext
const AuthContext = createContext();

// Create URLContext
const URLContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null); // Manage authentication state

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// URLProvider component
export const URLProvider = ({ children }) => {
    const [url, setUrl] = useState(''); // Manage URL state

    return (
        <URLContext.Provider value={{ url, setUrl }}>
            {children}
        </URLContext.Provider>
    );
};

// Custom hooks to use the contexts
export const useAuth = () => useContext(AuthContext);
export const useURL = () => useContext(URLContext);

// ... existing code ...