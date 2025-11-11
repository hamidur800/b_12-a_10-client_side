import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Registation() {
  const { createUser, updateUserProfile, googleLogin } =
    useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle Register Form Submit
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;

    setError("");

    if (password.length < 6) {
      Swal.fire(
        "Error!",
        "Password must be at least 6 characters long.",
        "error"
      );
      return;
    } else if (!/[A-Z]/.test(password)) {
      Swal.fire(
        "Error!",
        "Password must contain at least one uppercase letter.",
        "error"
      );
      return;
    } else if (!/[a-z]/.test(password)) {
      Swal.fire(
        "Error!",
        "Password must contain at least one lowercase letter.",
        "error"
      );
      return;
    }

    createUser(email, password).then(() => {
      updateUserProfile(name, photoURL)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Registration Successful!",
            text: "Welcome to Toy-Topia 🎉",
            showConfirmButton: false,
            timer: 1800,
          });
          navigate("/");
        })
        .catch((err) => setError(err.message));
    });
  };

  // Handle Google Login
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back 🎉",
          showConfirmButton: false,
          timer: 1800,
        });
        navigate("/");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <>
      {" "}
      <Helmet>
        {" "}
        <title>Registration | HOME-NEST</title>{" "}
      </Helmet>{" "}
      <div className="min-h-screen flex items-center justify-center px-4">
        {" "}
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md lg:max-w-xl flex flex-col lg:flex-row overflow-hidden">
          {" "}
          <div className="flex-1 p-8 sm:p-10">
            {" "}
            <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
              Register to HOME-NEST !{" "}
            </h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-1">Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter Your Name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 "
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">photoURL</label>
                <input
                  name="photoURL"
                  type="text"
                  placeholder="Enter Your photoURL"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                />
              </div>

              <div className="relative">
                <label className="block text-gray-600 mb-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute right-3 top-12 -translate-y-1/2 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={22} />
                  ) : (
                    <AiFillEye size={22} />
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors mt-4"
              >
                Registration
              </button>
            </form>
            <div className="divider">OR</div>
            <div
              onClick={handleGoogleLogin}
              className="flex justify-center items-center h-8 "
            >
              <FcGoogle className="cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-125 h-10 w-10" />
            </div>
            <p className="text-center text-gray-500 text-sm mt-6">
              Already have an account?{" "}
              <Link to="/Login" className="text-blue-500 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registation;
