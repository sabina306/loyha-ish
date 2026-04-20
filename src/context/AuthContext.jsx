import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('phpmaster_user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (email) => {
        const userData = {
            email,
            displayName: email.split('@')[0],
            loginDate: new Date().toISOString()
        };
        localStorage.setItem('phpmaster_user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('phpmaster_user');
        setUser(null);
        setIsAuthenticated(false);
    };

    const updateProfile = (updates) => {
        const updatedUser = { ...user, ...updates };
        localStorage.setItem('phpmaster_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    const value = {
        user,
        isAuthenticated,
        login,
        logout,
        updateProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
