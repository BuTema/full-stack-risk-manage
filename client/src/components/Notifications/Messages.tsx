import React from 'react'
import '../../styles/Messages.css'
import { useNotifications } from './ContextNotifications'
import Message from './Message'
import { Notification } from './Interfaces'

const Messages: React.FC = () => {
    const { GetAll, ClearAll, Remove } = useNotifications()

    if (!GetAll.length) {
        return null
    }

    return (
        <div className="notifications">
            <button className="notifications-close" onClick={ClearAll}>
                Close all
            </button>
            {GetAll.slice(0).reverse().map((notification: Notification) => (
                <Message
                    key={notification.id}
                    alert={notification}
                    deleteNotification={() => Remove(notification.id)}
                />
            ))}
        </div>
    )
}

export default Messages