import React from "react";
import { Link } from "react-router";

const Register = () => {
  const handleRegister = () => {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl border border-white/30">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
            Create an Account
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Join us and start your journey today!
          </p>

          <form onClick={handleRegister}>
            {/* Name Field */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  Full Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="input input-bordered w-full bg-white/70"
                required
              />
            </div>

            {/* Photo URL */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  Photo URL
                </span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Enter your photo URL"
                className="input input-bordered w-full bg-white/70"
              />
            </div>

            {/* Email Field */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full bg-white/70"
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  Password
                </span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full bg-white/70"
                required
              />
            </div>

            {/* Submit Button */}
            <button className="btn bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-700 hover:to-pink-600 w-full mt-2 text-white font-semibold border-none">
              Register
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-5">
            Already have an account?{" "}
            <Link to="/sing_in" className="link link-hover text-indigo-700 font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
