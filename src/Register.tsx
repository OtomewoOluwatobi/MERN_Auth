import test_bg from "./assets/test_bg.jpg";

/**
 * Register Component
 * Renders a registration form with fields for fullname, username, and password
 * Includes a split layout with a form on the left and background image on the right
 */
function Register() {
    return (
        // Main container
        <div>
            {/* Split screen layout container */}
            <div className="flex h-screen">
                {/* Left section - Registration form */}
                <div className="w-3/5" style={{ backgroundColor: "#bbcb9d" }}>
                    <div className="flex items-center justify-center h-full">
                        {/* Form card */}
                        <div className="bg-white p-8 rounded-lg shadow-xl w-[30rem]">
                            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                            
                            {/* Registration form */}
                            <form>
                                {/* Fullname input field */}
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="fullname"
                                    >
                                        Fullname
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="fullname"
                                        type="text"
                                        placeholder="Enter your fullname"
                                    />
                                </div>

                                {/* Username input field */}
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="username"
                                    >
                                        Username
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="username"
                                        type="text"
                                        placeholder="Enter your username"
                                    />
                                </div>

                                {/* Password input field */}
                                <div className="mb-6">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                    />
                                </div>

                                {/* Confirm Password input field */}
                                <div className="mb-6">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="confirmPassword"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirm your password"
                                    />
                                </div>

                                {/* Submit button */}
                                <button
                                    className="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                    type="submit"
                                >
                                    Sign Up
                                </button>

                                {/* Login link */}
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

                {/* Right section - Background image */}
                <div
                    className="w-1/2"
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

export default Register;