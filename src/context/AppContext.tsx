'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  clearNotifications: () => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'danger';
  timestamp: Date;
  read: boolean;
}

const defaultContext: AppContextProps = {
  darkMode: false,
  toggleDarkMode: () => { },
  notifications: [],
  addNotification: () => { },
  clearNotifications: () => { }
};

const AppContext = createContext<AppContextProps>(defaultContext);

export const useAppContext = () => useContext(AppContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const value = {
    darkMode,
    toggleDarkMode,
    notifications,
    addNotification,
    clearNotifications
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
