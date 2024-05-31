import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './components/UserContext'
import LoginPage from './pages/LoginPage'
import RiskList from './pages/RiskList'
import CategoryList from './pages/CategoryList'
import { NotificationsProvider } from './components/Notifications/ContextNotifications'

const App: React.FC = () => {
    return (
        <NotificationsProvider>
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/risks" element={<RiskList />} />
                        <Route path="/categories" element={<CategoryList />} />
                        <Route path="/" element={<LoginPage />} />
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </NotificationsProvider>
    )
}

export default App
