import test_bg from "./assets/test_bg.jpg";
import * as yup from 'yup';
import axios from 'axios';
import { useState, FormEvent, useEffect } from 'react';

// Type definitions for better type safety
interface FormData {
    username: string;
    password: string;
}

interface FormErrors {
    [key: string]: string;
}

/**
 * Login component that handles user authentication
 * @returns {JSX.Element} A responsive login form with username and password fields
 */
function Login() {
    // Check for token and redirect if exists
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = '/dashboard';
        }
    }, []);
    // Yup validation schema for form fields
    const validationSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
    });

    // State management
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Updates form state when input values change
     * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const renderFormField = (
        id: keyof FormData,
        label: string,
        type: string,
        placeholder: string
    ) => (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
                {label}
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 
                         text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={id}
                type={type}
                placeholder={placeholder}
                value={formData[id]}
                onChange={handleChange}
            />
            {errors[id] && (
                <p className="text-red-500 text-xs italic">{errors[id]}</p>
            )}
        </div>
    );

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Validate form data against schema
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({});

            // Make API call to login endpoint
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, formData);

            // Store user data in localStorage
            localStorage.setItem('token', JSON.stringify(response.data.token));

            // Redirect to dashboard
            window.location.href = '/dashboard';
        } catch (err: any) {
            if (err instanceof yup.ValidationError) {
                // Handle validation errors
                const validationErrors: FormErrors = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        validationErrors[error.path] = error.message;
                    }
                });
                setErrors(validationErrors);
            } else if (err.response) {
                // Handle API errors
                console.error('Backend error:', err.response.data);
                if (err.response.data.message) {
                    setErrors({ general: err.response.data.message });
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Login form container */}
            <div className="w-3/5" style={{ backgroundColor: "#bbcb9d" }}>
                <div className="flex items-center justify-center h-full">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-[30rem]">
                        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                        <form onSubmit={handleSubmit}>
                            {renderFormField("username", "Username", "text", "Enter your username")}
                            {renderFormField("password", "Password", "password", "Enter your password")}

                            <div className="flex items-center justify-between mb-6">
                                <a className="inline-block align-baseline font-bold text-sm 
                                          text-orange-500 hover:text-orange-800"
                                    href="#">
                                    Forgot Password?
                                </a>
                            </div>

                            <button
                                className={`w-full px-4 py-2 font-bold text-white rounded 
                                           bg-slate-900 hover:bg-slate-700 focus:outline-none 
                                           focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </button>

                            <p className="text-sm text-center mt-4">
                                Don't have an account?{" "}
                                <a href="/register" className="text-orange-500 hover:text-orange-800 font-bold">
                                    Sign up
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Background image */}
            <div className="w-1/2"
                style={{
                    backgroundImage: `url(${test_bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
        </div>
    );
}

export default Login;

