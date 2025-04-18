import test_bg from "./assets/test_bg.jpg";
import * as yup from 'yup';
import { useState, FormEvent } from 'react';
import axios from 'axios';

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

    /**
     * Updates form state when input values change
     * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    /**
     * Handles form submission, validation, and API call
     * @param {FormEvent} e - Form submission event
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            // Validate form data against schema
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({});

            // Make API call to login endpoint
            const response = await axios.post('http://localhost:3001/api/login', formData);
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));
            // Optionally, you can also store just the token if that's what the backend returns
            localStorage.setItem('token', response.data.token);
            // Redirect to dashboard or another page
            window.location.href = '/dashboard';
        } catch (err: any) {
            // Handle API errors
            if (err.response) {
                console.error('Backend error:', err.response.data);
                if (err.response.status === 401) {
                    alert(err.response.data.message);
                }
                if (err.response.data.message) {
                    setErrors({ general: err.response.data.message });
                }
            }
            // Handle validation errors
            if (err instanceof yup.ValidationError) {
                const validationErrors: FormErrors = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        validationErrors[error.path] = error.message;
                    }
                });
                setErrors(validationErrors);
            }
        }
    };

    /**
     * Renders a form input field with label and error message
     * @param {keyof FormData} id - Input field identifier
     * @param {string} label - Input label text
     * @param {string} type - Input type (text/password)
     * @param {string} placeholder - Input placeholder text
     */
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

                            <button className="w-full px-4 py-2 font-bold text-white rounded 
                                           bg-slate-900 hover:bg-slate-700 focus:outline-none 
                                           focus:shadow-outline"
                                type="submit">
                                Sign In
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
