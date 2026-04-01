import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => setCollapsed(prev => !prev);

    return (
        <SidebarContext.Provider value={{ collapsed, setCollapsed, toggleCollapsed }}>
            {children}
        </SidebarContext.Provider>
    );
};
