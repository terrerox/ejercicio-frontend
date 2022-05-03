import { Navigate } from "react-router-dom"

export const PrivateRoute = ({
    isAuthenticated,
    element: Component
}) => (
    isAuthenticated ? <Component /> : <Navigate to="/login" />
)
