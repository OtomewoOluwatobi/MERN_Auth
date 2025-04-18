import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    // Optionally, you can also check if the user data exists
    const userData = localStorage.getItem('user');
    if (!userData) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;