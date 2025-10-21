import React from "react";
import { Link } from "react-router";

const SingIn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl border border-white/30">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
            Welcome Back 👋
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Sign in to continue to your account
          </p>

          <form>
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
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-indigo-700"
                >
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button className="btn bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-700 hover:to-pink-600 w-full mt-2 text-white font-semibold border-none">
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-gray-400">OR</div>

          {/* Social Login */}
          <button className="btn btn-outline w-full mb-2 bg-white/70 hover:bg-white">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>
          <button className="btn btn-outline w-full bg-white/70 hover:bg-white">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="Github"
              className="w-5 h-5 mr-2"
            />
            Continue with GitHub
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-5">
            Don’t have an account?{" "}
            <Link to="/register" className="link link-hover text-indigo-700 font-medium">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingIn;
