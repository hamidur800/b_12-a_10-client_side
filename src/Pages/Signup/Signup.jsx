import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Provaider/AuthProvider";

const Signup = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUser(email, password)
      .then((result) => {
        console.log("User created:", result.user);
        navigate("/"); // after signup go home
      })
      .catch((error) => console.error(error.message));
  };

  const handleGoogleSignup = () => {
    googleLogin()
      .then((result) => {
        console.log("Google user:", result.user);
        navigate("/");
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100 p-6">
      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden p-8">
        <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-xl pr-12 focus:ring-2 focus:ring-indigo-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600"
          >
            Sign Up
          </button>
        </form>

        <div className="divider my-6 text-gray-400 text-sm">OR</div>

        <div
          onClick={handleGoogleSignup}
          className="flex justify-center items-center gap-2 border py-2 rounded-xl cursor-pointer hover:shadow-md transition-transform transform hover:scale-105"
        >
          <FcGoogle className="text-2xl" />
          <span className="text-gray-700 font-medium">
            Continue with Google
          </span>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/LogIn" className="text-indigo-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
