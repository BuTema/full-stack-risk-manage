import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_RISK, GET_CATEGORIES } from '../apollo/queries'
import { useNotifications } from './Notifications/ContextNotifications'

interface AddRiskModalProps {
    isOpen: boolean
    onClose: () => void
    createdBy: string
}

interface RiskInput {
    name: string
    description: string
    categoryName: string
}

function AddRiskModal({ isOpen, onClose, createdBy }: AddRiskModalProps) {
    const [riskInput, setRiskInput] = useState<RiskInput>({ name: '', description: '', categoryName: '' })
    const { data, refetch } = useQuery(GET_CATEGORIES, { variables: { page: 1, limit: 0 } })
    const [addRisk] = useMutation(ADD_RISK)
    const Notifications = useNotifications()

    useEffect(() => {
        refetch()
        // eslint-disable-next-line
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setRiskInput(prev => ({ ...prev, [name]: value }))
    }

    const handleAddRisk = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const { name, description, categoryName } = riskInput
            const category = data.categories.find((cat: any) => cat.name === categoryName)
            await addRisk({
                variables: { name, description, categoryId: category._id, resolved: false, createdBy }
            })
            Notifications.Add('success', 'Risk added successful')
            onClose()
        } catch (error) {
            console.error("Error adding risk:", error)
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
                    <h2 className="text-lg font-bold">Add a New Risk</h2>
                    <button onClick={onClose} className="text-xl font-bold hover:text-gray-700">×</button>
                </div>
                <form onSubmit={handleAddRisk} className="mt-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Risk Name:</label>
                    <input type="text" name="name" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={riskInput.name} onChange={handleInputChange} />

                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                    <input type="text" name="description" id="description" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={riskInput.description} onChange={handleInputChange} />

                    <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category:</label>
                    <select
                        name="categoryName"
                        id="categoryName"
                        value={riskInput.categoryName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required>
                        <option value="">Select a Category</option>
                        {data?.categories.map((category: any) => (
                            <option key={category._id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <button type="submit" className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Risk</button>
                </form>
            </div>
        </div>
    )
}

export default AddRiskModal