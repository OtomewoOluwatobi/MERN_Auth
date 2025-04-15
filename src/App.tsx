import { useState } from "react";
import test_bg from "./assets/test_bg.jpg";

function App() {
  return (
    <>
      <div className="flex h-screen">
        <div className="w-3/5" style={{ backgroundColor: "#bbcb9d" }}>
          <div className="flex items-center justify-center h-full">
            <div className="bg-white p-8 rounded-lg  shadow-xl w-[30rem]">
              <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
              <form>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
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
                <div className="flex items-center justify-between mb-6">
                  <a
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="submit"
                >
                  Sign In
                </button>
                <p className="text-sm text-center mt-4">
                  Don't have an account?{" "}
                  <a href="#" className="text-blue-500 hover:text-blue-800 font-bold">
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div
          className="w-1/2"
          style={{
            backgroundImage: `url(${test_bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </>
  );
}

export default App;
