import React, { createContext, useState, ReactNode } from 'react'
import Messages from './Notifications/Messages'

interface UserContextProps {
    username: string
    setUsername: (username: string) => void
}

export const UserContext = createContext<UserContextProps | undefined>(undefined)

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string>('')

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            <Messages />
            {children}
        </UserContext.Provider>
    )
}