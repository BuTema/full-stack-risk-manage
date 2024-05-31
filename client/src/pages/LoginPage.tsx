import React, { useContext, useState } from 'react'
import { UserContext } from '../components/UserContext'
import { useNavigate } from "react-router-dom"

const LoginPage: React.FC = () => {
    const { username, setUsername } = useContext(UserContext)!
    const [inputValue, setInputValue] = useState<string>('')
    const navigate = useNavigate()

    if (username.length) {
        navigate('/categories')
    }

    const handleLogin = () => {
        setUsername(inputValue)
        navigate('/categories')
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl mb-4">Login</h2>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    placeholder="Enter your username"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button className="bg-blue-500 text-white w-full p-2 rounded" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    )
}

export default LoginPage