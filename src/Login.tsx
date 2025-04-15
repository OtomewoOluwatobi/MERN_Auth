import test_bg from "./assets/test_bg.jpg";

/**
 * Login component that handles user authentication
 * Renders a responsive login form with username and password fields
 * alongside a decorative background image
 * @returns {JSX.Element} Login component
 */
function Login() {
    return (
        // Root container
        <div>
            {/* Main flex container for the two-column layout */}
            <div className="flex h-screen">
                {/* Left section - Login form */}
                <div className="w-3/5" style={{ backgroundColor: "#bbcb9d" }}>
                    <div className="flex items-center justify-center h-full">
                        {/* Login form card with shadow and rounded corners */}
                        <div className="bg-white p-8 rounded-lg shadow-xl w-[30rem]">
                            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                            
                            <form>
                                {/* Username input group */}
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="username"
                                    >
                                        Username
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 
                                                 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="username"
                                        type="text" // Changed from "username" to "text" for proper HTML5 validation
                                        placeholder="Enter your username"
                                    />
                                </div>

                                {/* Password input group */}
                                <div className="mb-6">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 
                                                 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                    />
                                </div>

                                {/* Additional links section */}
                                <div className="flex items-center justify-between mb-6">
                                    <a
                                        className="inline-block align-baseline font-bold text-sm 
                                                 text-orange-500 hover:text-orange-800"
                                        href="#"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>

                                {/* Submit button */}
                                <button
                                    className="w-full px-4 py-2 font-bold text-white rounded 
                                             bg-slate-900 hover:bg-slate-700 focus:outline-none 
                                             focus:shadow-outline"
                                    type="submit"
                                >
                                    Sign In
                                </button>

                                {/* Registration link */}
                                <p className="text-sm text-center mt-4">
                                    Don't have an account?{" "}
                                    <a 
                                        href="/register" 
                                        className="text-orange-500 hover:text-orange-800 font-bold"
                                    >
                                        Sign up
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right section - Decorative background image */}
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

export default Login;