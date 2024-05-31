import React, { createContext, useState, ReactNode, useContext } from 'react'
import { NotificationType, Notification, NotificationContextType } from './Interfaces'

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([])

    const AddNotification = (type: NotificationType, message: string) => {
        const newNotification = { id: Date.now(), type, message }
        setNotifications(prevNotifications => [...prevNotifications, newNotification])
    }

    const RemoveNotification = (id: number) => {
        setNotifications(prevNotifications =>
            prevNotifications.filter(notification => notification.id !== id)
        )
    }

    const ClearNotifications = () => {
        setNotifications([])
    }
    return (
        <NotificationContext.Provider value={{ notifications, AddNotification, RemoveNotification, ClearNotifications }}>
            {children}
        </ NotificationContext.Provider>
    )
}

export const useNotifications = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationsProvider')
    }
    return {
        GetAll: context.notifications,
        Add: context.AddNotification,
        Remove: context.RemoveNotification,
        ClearAll: context.ClearNotifications
    }
}
