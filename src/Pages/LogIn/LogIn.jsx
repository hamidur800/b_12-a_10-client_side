import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../provider/AuthProvider";

function Login() {
  const { signIn, googleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();

  // const handleForgot = () => {
  //   const email = emailRef.current.value;
  //   sendPasswordResetEmail(auth, email)
  //     .then(() => {
  //       Swal.fire(
  //         "Check your email!",
  //         "Password reset link sent successfully.",
  //         "success"
  //       );
  //     })
  //     .catch((error) => {
  //       Swal.fire("Error!", error.message, "error");
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

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

    signIn(email, password)
      .then(() => {
        Swal.fire("Success!", "Logged in successfully", "success");
        navigate(location.state || "/");
      })
      .catch(() => {
        Swal.fire("Error!", "Incorrect Password", "error");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        Swal.fire("Success!", "Logged in with Google", "success");
        navigate(location.state || "/");
      })
      .catch((err) => {
        Swal.fire("Error!", err.message, "error");
      });
  };

  return (
    <>
      <Helmet>
        <title>Login | HOME-NEST</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="border shadow-2xl rounded-2xl w-full max-w-md lg:max-w-xl flex flex-col lg:flex-row overflow-hidden">
          <div className="flex-1 p-8 sm:p-10">
            <h2 className="text-3xl font-bold text-center  mb-6">
              Log In HOME-NEST !
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  value={email}
                  ref={emailRef}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-gray-400 mb-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute  right-3 top-12 -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={22} />
                  ) : (
                    <AiFillEye size={22} />
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <div>
                  {/* to="/forget-password" */}
                  <Link state={{ email }}>
                    <button className="link link-hover text-blue-500">
                      Forgot password?
                    </button>
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors mt-4"
              >
                Login
              </button>
            </form>

            <div className="divider">OR</div>

            <div
              className="flex justify-center items-center h-8"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-125 h-10 w-10" />
            </div>

            <p className="text-center text-gray-500 text-sm mt-6">
              Don't have an account?{" "}
              <Link to="/Registation" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
