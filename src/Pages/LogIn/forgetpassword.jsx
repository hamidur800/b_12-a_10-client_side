import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router"; // navigate added
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const ForgetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate hook
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleReset = (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire("Error!", "Please enter your email address", "error");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire(
          "Success!",
          "Password reset link sent successfully. Please check your Gmail.",
          "success"
        ).then(() => {
          navigate("/login"); // ✅ Redirect to Login Page
        });
      })
      .catch((error) => {
        Swal.fire("Error!", error.message, "error");
      });
  };

  return (
    <>
      <Helmet>
        <title>Forget Password | ToyTopia</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 to-purple-200 px-4">
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
            Forgot Password
          </h2>

          <form onSubmit={handleReset} className="space-y-5">
            <div>
              <label className="block text-gray-600 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your registered email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
