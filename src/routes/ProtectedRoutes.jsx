import { useContext } from "react"
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/auth.context'

const ProtectedRoutes = () => {
    const { loggedUser, isLoading } = useContext(AuthContext)
    if (isLoading) {
        return <p>Se está cargando</p>
    }
    if (!loggedUser) {
        return <Navigate to="/logIn" />
    }
    return <Outlet />
}
export default ProtectedRoutes