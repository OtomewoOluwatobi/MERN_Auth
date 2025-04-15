import test_bg from "./assets/test_bg.jpg";
import * as yup from 'yup';
import { useState, FormEvent } from 'react';

// Define the form data interface for better type safety
interface FormData {
    username: string;
    password: string;
}

// Define the error state interface
interface FormErrors {
    [key: string]: string;
}

/**
 * Login component that handles user authentication
 * Renders a responsive login form with username and password fields
 * alongside a decorative background image
 */
function Login() {
    // Validation schema for form inputs
    const schema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
    });

    // State management for form data and validation errors
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});

    /**
     * Updates form data state when input values change
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    /**
     * Handles form submission and validation
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            // Validate form data against schema
            await schema.validate(formData, { abortEarly: false });
            setErrors({});
            // TODO: Implement actual login logic here
            console.log('Form data:', formData);
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                // Collect validation errors
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

    // Render form input field with label and error message
    const renderFormField = (
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
        <div>
            <div className="flex h-screen">
                {/* Login form section */}
                <div className="w-3/5" style={{ backgroundColor: "#bbcb9d" }}>
                    <div className="flex items-center justify-center h-full">
                        <div className="bg-white p-8 rounded-lg shadow-xl w-[30rem]">
                            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                            
                            <form onSubmit={handleSubmit}>
                                {renderFormField("username", "Username", "text", "Enter your username")}
                                {renderFormField("password", "Password", "password", "Enter your password")}

                                {/* Additional links and buttons */}
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
                                    <a href="/register" 
                                       className="text-orange-500 hover:text-orange-800 font-bold">
                                        Sign up
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Background image section */}
                <div className="w-1/2"
                     style={{
                         backgroundImage: `url(${test_bg})`,
                         backgroundSize: "cover",
                         backgroundPosition: "center",
                     }}
                />
            </div>
        </div>
    );
}

export default Login;
