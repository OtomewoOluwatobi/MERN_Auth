import { useNavigate } from 'react-router-dom';
import { FC, useCallback } from 'react';

interface UserData {
    user: {
        fullname: string;
        username: string;
    }
}

const Dashboard: FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/');
        return;
    }
    const decodedToken = jwt_decode(token) as UserData;
    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        navigate('/');
    }, [navigate]);

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-center mb-8">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-slate-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>

            <h1 className="text-3xl font-bold mb-4 text-center">
                Welcome {decodedToken.user.fullname}!
            </h1>
            <div className="flex items-center justify-center mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                    />
                </svg>
                <p>You are successfully logged in!</p>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
function jwt_decode(token: string): UserData {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64).split('').map(c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        throw new Error('Invalid token');
    }
}
