import React from 'react'

interface ConfirmationDialogProps {
    message: string
    onConfirm: () => void
    onCancel: () => void
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-4 rounded shadow-md">
                <p>{message}</p>
                <div className="mt-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={onConfirm}>Confirm</button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationDialog
