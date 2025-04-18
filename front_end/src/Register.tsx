import test_bg from "./assets/test_bg.jpg";
import { useState, FormEvent } from 'react';
import * as yup from 'yup';
import axios from 'axios';

// Define the form data interface
interface FormData {
    fullname: string;
    username: string;
    password: string;
    confirmPassword: string;
}

/**
 * Register Component
 * Renders a registration form with validation and split layout design
 */
function Register() {
    // Validation schema using yup
    const validationSchema = yup.object().shape({
        fullname: yup.string().required('Fullname is required'),
        username: yup.string().required('Username is required'),
        password: yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password')], 'Passwords must match')
            .required('Confirm password is required')
    });

    // Initialize form state
    const [formData, setFormData] = useState<FormData>({
        fullname: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    // Initialize error state
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    
    // Initialize loading state
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Updates form data when input values change
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        // Clear error when user starts typing
        if (errors[id]) {
            setErrors(prev => ({
                ...prev,
                [id]: ''
            }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            const { confirmPassword, ...registrationData } = formData;
            const response = await axios.post('http://localhost:3001/api/register', registrationData);
            if (response.status === 201) {
                alert('Registration successful! Redirecting to login...');
                setIsLoading(false);
                window.location.href = '/';
            }
        } catch (err: any) {
            if (err.response) {
                console.error('Backend error:', err.response.data);
                alert(err.response.data.message || 'An error occurred during registration.');
            }
            if (err instanceof yup.ValidationError) {
                const validationErrors: { [key: string]: string } = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        validationErrors[error.path] = error.message;
                    }
                });
                setErrors(validationErrors);
            }
            setIsLoading(false);
        }
    };

    /**
     * Renders an input field with label and error message
     */
    const renderInputField = (
        id: keyof FormData,
        label: string,
        type: string,
        placeholder: string
    ) => (
        <div className="mb-4">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={id}
                type={type}
                placeholder={placeholder}
                value={formData[id]}
                onChange={handleChange}
            />
            {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]}</p>}
        </div>
    );

    return (
        <div className="flex h-screen">
            {/* Form Section */}
            <div className="w-3/5" style={{ backgroundColor: "#bbcb9d" }}>
                    <div className="flex items-center justify-center h-full">
                        <div className="bg-white p-8 rounded-lg shadow-xl w-[30rem]">
                            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                            
                            <form method="post" onSubmit={handleSubmit}>
                                {renderInputField("fullname", "Fullname", "text", "Enter your fullname")}
                                {renderInputField("username", "Username", "text", "Enter your username")}
                                {renderInputField("password", "Password", "password", "Enter your password")}
                                {renderInputField("confirmPassword", "Confirm Password", "password", "Confirm your password")}

                                <button
                                    className="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:bg-slate-400 disabled:cursor-not-allowed"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Signing up...' : 'Sign Up'}
                                </button>

                                <p className="text-sm text-center mt-4">
                                    I already have an account?{" "}
                                    <a href="/" className="text-orange-500 hover:text-orange-800 font-bold">
                                        Login
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Background Image Section */}
                <div
                    className="w-1/2"
                    style={{
                        backgroundImage: `url(${test_bg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            </div>
    );
}

export default Register;
