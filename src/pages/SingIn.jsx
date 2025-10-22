import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router";
import { auth } from "../firebase/FirebaseConfig";
import Swal from "sweetalert2";
import bgImage from "../assets/colorful-toys-scattered-around-blue-background-with-space-middle-text_14117-608480.jpg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const SignIn = () => {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  // 🔹 Google Sign In
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setUser(res.user);
        Swal.fire({
          icon: "success",
          title: "Signed In with Google!",
          text: `Welcome, ${res.user.displayName}`,
          confirmButtonColor: "#6366f1",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: err.message,
          confirmButtonColor: "#ef4444",
        });
      });
  };

  // 🔹 Github Sign In
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((res) => {
        setUser(res.user);
        Swal.fire({
          icon: "success",
          title: "Signed In with GitHub!",
          text: `Welcome, ${res.user.displayName || "User"}`,
          confirmButtonColor: "#6366f1",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: err.message,
          confirmButtonColor: "#ef4444",
        });
      });
  };

  // 🔹 Forgot Password (Reset Email)
  const handleForgetPassword = async () => {
    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email address first!",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        icon: "success",
        title: "Password Reset Sent!",
        text: "Check your inbox for reset instructions.",
        confirmButtonColor: "#6366f1",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
        confirmButtonColor: "#ef4444",
      });
    }
  };

  // 🔹 Email/Password Sign In
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const emailValue = form.email.value.trim();
    const password = form.password.value;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        html: `
          Password must meet the following rules:<br/>
          - Minimum 8 characters<br/>
          - At least 1 uppercase letter<br/>
          - At least 1 lowercase letter<br/>
          - At least 1 number<br/>
          - At least 1 special character (@$!%*?&)
        `,
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    signInWithEmailAndPassword(auth, emailValue, password)
      .then((res) => {
        if (!res.user.emailVerified) {
          Swal.fire({
            icon: "warning",
            title: "Email Not Verified",
            text: "Please verify your email before signing in.",
            confirmButtonColor: "#f59e0b",
          });
          return;
        }
        setUser(res.user);
        Swal.fire({
          icon: "success",
          title: "Signed In!",
          text: `Welcome back, ${res.user.email}`,
          confirmButtonColor: "#6366f1",
        });
        form.reset();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: err.message,
          confirmButtonColor: "#ef4444",
        });
      });
  };

  // 🔹 Sign Out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          confirmButtonColor: "#6366f1",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.message,
          confirmButtonColor: "#ef4444",
        });
      });
  };

  // 🔹 UI
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-white drop-shadow mb-3">
          {user ? "Welcome 👋" : "Welcome Back 👋"}
        </h1>

        {user ? (
          <div className="text-center space-y-4">
            <p className="text-green-200 font-semibold">
              You are logged in as {user.email}
            </p>
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="User Avatar"
              className="mx-auto mt-3 w-20 h-20 rounded-full"
            />
            <h2 className="text-xl font-semibold text-white">
              {user?.displayName || "Anonymous User"}
            </h2>

            <button
              onClick={handleSignOut}
              className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <p className="text-center text-gray-200 mb-6">
              Sign in to continue to your account
            </p>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-gray-100 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/80 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-gray-100 mb-1">Password</label>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-3 rounded-lg bg-white/80 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
                  required
                />
                <div
                  className="absolute right-3 top-10 text-gray-600 cursor-pointer"
                  onClick={() => setShow(!show)}
                >
                  {show ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
                </div>

                <div className="text-right mt-1">
                  <button
                    type="button"
                    onClick={handleForgetPassword}
                    className="text-sm font-semibold text-indigo-300 hover:text-indigo-400"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-pink-600 transition-all duration-300"
              >
                Sign In
              </button>
            </form>

            <div className="flex items-center my-5">
              <hr className="flex-grow border-gray-400" />
              <span className="text-gray-200 px-3">OR</span>
              <hr className="flex-grow border-gray-400" />
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full mb-2 bg-white/70 hover:bg-white flex justify-center items-center gap-2 py-2 rounded-lg shadow"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            <button
              onClick={handleGithubSignIn}
              className="w-full bg-white/70 hover:bg-white flex justify-center items-center gap-2 py-2 rounded-lg shadow"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                alt="Github"
                className="w-5 h-5"
              />
              Continue with GitHub
            </button>

            <p className="text-center text-sm text-gray-200 mt-5">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-yellow-300 link link-hover font-medium"
              >
                Register now
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignIn;
