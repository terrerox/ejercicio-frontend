import { Navigate } from "react-router-dom"

export const PublicRoute = ({
    isAuthenticated,
    element: Component
}) => (
    !isAuthenticated ? <Component /> : <Navigate to="/" />
)
