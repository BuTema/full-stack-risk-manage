type NotificationType = 'success' | 'error' | 'info'

interface Notification {
    id: number
    type: NotificationType
    message: string
}

interface NotificationContextType {
    notifications: Notification[]
    AddNotification: (type: NotificationType, message: string) => void
    RemoveNotification: (id: number) => void
    ClearNotifications: () => void
}

export type {
    NotificationType,
    Notification,
    NotificationContextType
}