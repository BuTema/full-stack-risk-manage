import React, { useContext, useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { UserContext } from '../components/UserContext'
import ConfirmationDialog from '../components/ConfirmationDialog'
import { useNavigate } from 'react-router-dom'
import AddCategoryModal from '../components/AddCategoryModal'
import { GET_CATEGORIES, REMOVE_CATEGORY, UPDATE_CATEGORY } from '../apollo/queries'
import { useNotifications } from '../components/Notifications/ContextNotifications'

const CategoryList: React.FC = () => {
    const navigate = useNavigate()
    const { username } = useContext(UserContext)!
    const [page, setPage] = useState(1)
    const [limit] = useState(10)
    const [confirmation, setConfirmation] = useState<{ message: string, onConfirm: () => void } | null>(null)
    const { loading, error, data, refetch } = useQuery(GET_CATEGORIES, { variables: { page, limit } })
    const [removeCategory] = useMutation(REMOVE_CATEGORY)
    const [updateCategory] = useMutation(UPDATE_CATEGORY)
    const [editingCategory, setEditingCategory] = useState<string | null>(null)
    const [categoryForm, setCategoryForm] = useState({ name: '', description: '' })
    const [searchTerm, setSearchTerm] = useState('')
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const Notifications = useNotifications()

    useEffect(() => {
        if (!username.length) {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [username])

    const handleEditCategory = (category: any) => {
        setEditingCategory(category._id)
        setCategoryForm({ name: category.name, description: category.description })
    }

    const handleUpdateCategory = async (id: string) => {
        await updateCategory({ variables: { id, name: categoryForm.name, description: categoryForm.description } })
        setEditingCategory(null)
    }

    const filteredCategories = data?.categories.filter((category: any) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    )


    const handleRemove = async (id: string) => {
        setConfirmation({
            message: 'Are you sure you want to remove this category?',
            onConfirm: async () => {
                const result = await removeCategory({ variables: { id } })
                if (result.data.removeCategory.success) {
                    refetch()
                    Notifications.Add('success', result.data.removeCategory.message)
                } else {
                    Notifications.Add('error', result.data.removeCategory.message)
                }
                setConfirmation(null)
            }
        })
    }

    useEffect(() => {
        if (!modalIsOpen) {
            refetch()
        }
        // eslint-disable-next-line
    }, [modalIsOpen])

    if (error) return <p>Error: {error.message}</p>

    return (
        <div className='p-10'>
            <AddCategoryModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} createdBy={username} />

            <div className=' ml-4 flex align-center items-center'>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate('/risks')}>
                    Go to Risks
                </button>
                <h1 className="flex-auto text-center text-2xl font-bold m-4">Categories</h1>
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setModalIsOpen(true)}>
                    Add category
                </button>
            </div>

            {data?.categories?.length ?
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-3 px-4 py-2 border border-gray-300 rounded"
                />
                : null}

            {!loading && filteredCategories?.length ?
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Description</th>
                            <th className="border px-4 py-2">Created By</th>
                            <th className="border px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.map((category: any) => (
                            <tr key={category._id}>
                                <td className="border px-4 py-2" onClick={() => handleEditCategory(category)}>
                                    {editingCategory === category._id ? (
                                        <input
                                            type="text"
                                            className='w-full h-full'
                                            value={categoryForm.name}
                                            onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                                            onBlur={() => handleUpdateCategory(category._id)}
                                        />
                                    ) : (
                                        category.name
                                    )}
                                </td>
                                <td className="border px-4 py-2" onClick={() => handleEditCategory(category)}>
                                    {editingCategory === category._id ? (
                                        <input
                                            type="text"
                                            className='w-full h-full'
                                            value={categoryForm.description}
                                            onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                                            onBlur={() => handleUpdateCategory(category._id)}
                                        />
                                    ) : (
                                        category.description
                                    )}
                                </td>
                                <td className="border px-4 py-2">{category.createdBy}</td>
                                <td className="border px-4 py-2">
                                    <div className="flex justify-center items-center">
                                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleRemove(category._id)}>
                                            Remove
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                : null}
            {confirmation && <ConfirmationDialog {...confirmation} onCancel={() => setConfirmation(null)} />}
            {filteredCategories?.length >= limit ?
                <div className="flex justify-between mt-4">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={() => setPage(page > 1 ? page - 1 : page)}
                    >
                        Previous
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>
                : null}
        </div>
    )
}

export default CategoryList
