import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router"; // ✅ useNavigate যোগ করো
import bgImage from "../assets/colorful-toys-scattered-around-blue-background-with-space-middle-text_14117-608480.jpg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { AuthenticationContext } from "../Context/AuthenticationContext";

const Register = () => {
  const [show, setShow] = useState(false);
  const { createUserWithEmailAndPasswordFunc } = useContext(AuthenticationContext);
  const navigate = useNavigate(); // ✅ navigation setup

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    // Password validation
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

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPasswordFunc(email, password);
      const user = userCredential.user;

      // Update profile
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      // Send verification email
      await sendEmailVerification(user);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        html: `
          <b>Welcome, ${name}!</b><br/>
          A verification email has been sent to <b>${email}</b>.<br/>
          Please check your inbox or spam folder to verify your account.
        `,
        confirmButtonColor: "#4f46e5",
      }).then(() => {
        // ✅ Redirect to Sign In page after success
        navigate("/Sing_in");
      });

      form.reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl border border-white/30 p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-white">
          Create an Account
        </h1>
        <p className="text-center text-gray-200 mb-6">
          Join us and start your journey today!
        </p>

        <form onSubmit={handleRegister}>
          {/* Name */}
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text text-white font-medium">
                Full Name
              </span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="input input-bordered w-full bg-white/80 text-gray-800"
              required
            />
          </div>

          {/* Photo URL */}
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text text-white font-medium">
                Photo URL
              </span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Enter your photo URL"
              className="input input-bordered w-full bg-white/80 text-gray-800"
            />
          </div>

          {/* Email */}
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text text-white font-medium">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-white/80 text-gray-800"
              required
            />
          </div>

          {/* Password */}
          <div className="form-control mb-4 relative">
            <label className="label">
              <span className="label-text text-white font-medium">
                Password
              </span>
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-white/80 text-gray-800"
              required
            />
            <div
              className="absolute right-3 top-10 text-gray-600 cursor-pointer"
              onClick={() => setShow(!show)}
            >
              {show ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
            </div>
          </div>

          {/* Submit */}
          <button className="btn bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-700 hover:to-pink-600 w-full mt-2 text-white font-semibold border-none">
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-200 mt-5">
          Already have an account?{" "}
          <Link
            to="/Sing_in"
            className="link link-hover text-yellow-300 font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
