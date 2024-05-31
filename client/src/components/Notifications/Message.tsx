import React, { useState } from "react"
import { Notification } from './Interfaces'

interface MessageProps {
    alert: Notification
    deleteNotification: (id: number) => void
}

const Message: React.FC<MessageProps> = ({ alert, deleteNotification }) => {
    const { id, message, type } = alert
    const [show, setShow] = useState(true)

    const truncatedMessage =
        message.indexOf("(") === -1 ? message : message.slice(0, message.indexOf("("))

    const Header = (type: string) => {
        if (type === "success") {
            return "Good news"
        }
        if (type === "warning") {
            return "Additional Information"
        }
        return "Something went wrong!"
    }

    const handleClose = () => {
        setShow(false)
        setTimeout(() => {
            setShow(true)
            deleteNotification(id)
        }, 400)
    }

    return (
        <div
            className={`notification shadow notification-${type} ${show ? "show" : "hide"
                }`}
            style={{
                animationDuration: "0.5s",
                animationFillMode: "both",
                animationName: show ? "slideIn" : "slideOut",
            }}
        >
            <div className="notification-header">
                <h4 className="notification-header-text">{Header(type)}</h4>
                <span className="message-header-button" onClick={handleClose}>
                    ✖
                </span>
            </div>
            <span>{type !== "error" ? message : truncatedMessage}</span>
        </div>
    )
}

export default Message