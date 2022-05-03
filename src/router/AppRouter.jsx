import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useUserStore } from '../store';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { LoginScreen } from '../components/login/LoginScreen';
import { RegisterScreen } from '../components/register/RegisterScreen';
import { HomeScreen } from '../components/home/HomeScreen';


export const AppRouter = () => {
    const { loggedIn } = useUserStore(state => state.status)
 
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={
                    <PublicRoute 
                        element={LoginScreen} 
                        isAuthenticated={loggedIn}
                    />} 
                />
                <Route path="/register" element={
                    <PublicRoute 
                        element={RegisterScreen} 
                        isAuthenticated={loggedIn}
                    />} 
                />
                <Route path="/" element={
                    <PrivateRoute 
                        element={HomeScreen} 
                        isAuthenticated={loggedIn}
                    />}
                />
            </Routes>
        </BrowserRouter>
    )
}