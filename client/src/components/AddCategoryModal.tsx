import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_CATEGORY } from '../apollo/queries'
import { useNotifications } from './Notifications/ContextNotifications'

interface AddCategoryModalProps {
    isOpen: boolean
    onClose: () => void
    createdBy: string
}

interface CategoryInput {
    name: string
    description: string
}

function AddCategoryModal({ isOpen, onClose, createdBy }: AddCategoryModalProps) {
    const [categoryInput, setCategoryInput] = useState<CategoryInput>({ name: '', description: '' })
    const [addCategory] = useMutation(ADD_CATEGORY)
    const Notifications = useNotifications()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCategoryInput(prev => ({ ...prev, [name]: value }))
    }

    const handleAddCategory = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const { name, description } = categoryInput
            await addCategory({
                variables: { name, description, createdBy }
            })
            Notifications.Add('success', 'Risk added successful')
            onClose()
        } catch (error) {
            console.error("Error adding category:", error)
        }
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={handleOverlayClick} >
            <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">Add a New Category</h2>
                    <button onClick={onClose} className="text-xl font-bold hover:text-gray-700">×</button>
                </div>
                <form onSubmit={handleAddCategory} className="mt-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name:</label>
                    <input type="text" name="name" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={categoryInput.name} onChange={handleInputChange} required />

                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                    <input type="text" name="description" id="description" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={categoryInput.description} onChange={handleInputChange} required />

                    <button type="submit" className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Category</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategoryModal
