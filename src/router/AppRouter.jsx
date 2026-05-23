import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { haySesion } from '../utils/auth'
import LoginPage from '../pages/LoginPage'
import PanelPage from '../pages/PanelPage'

function RutaProtegida({ children }) {
    if (!haySesion()) {
        return <Navigate to="/login" replace />
    }
    return children
}

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/panel"
                    element={
                        <RutaProtegida>
                            <PanelPage />
                        </RutaProtegida>
                    }
                />
                <Route path="/" element={<Navigate to="/panel" replace />} />
                <Route path="*" element={<Navigate to="/panel" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter