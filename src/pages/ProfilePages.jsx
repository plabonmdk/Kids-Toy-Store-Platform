import React, { useState, useEffect } from "react";
import { auth } from "../firebase/FirebaseConfig";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const ProfilePages = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [provider, setProvider] = useState("");

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setName(currentUser.displayName || "");
      setPhotoURL(currentUser.photoURL || "https://via.placeholder.com/150");

      if (currentUser.providerData && currentUser.providerData.length > 0) {
        setProvider(currentUser.providerData[0].providerId);
      }
    }
  }, []);

  const handleUpdate = async () => {
    if (!user) return;
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });

      // Update user info instantly without reload
      const updatedUser = {
        ...user,
        displayName: name,
        photoURL: photoURL,
      };
      setUser(updatedUser);

      Swal.fire(" Updated!", "Your profile has been updated successfully.", "success");
    } catch (error) {
      console.error("Profile update error:", error);
      Swal.fire(" Error!", "Something went wrong while updating.", "error");
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-10 text-lg">
        Please login to view your profile.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="p-6 max-w-md mx-auto bg-white rounded shadow mt-15"
    >
      {/* Profile Info Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-6"
      >
        <img
          src={user.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-3 border-2 border-gray-300 object-cover"
        />
        <h2 className="text-xl font-bold">{user.displayName || "No Name"}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-400 mt-1">Login with: {provider}</p>
      </motion.div>

      {/* Name Input */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      {/* Email Display */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Email:</label>
        <input
          type="email"
          value={user.email}
          disabled
          className="border p-2 w-full rounded bg-gray-100"
        />
      </div>

      {/* Photo URL Input */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Profile Photo URL:</label>
        <input
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          placeholder="Enter image URL"
          className="border p-2 w-full rounded"
        />
      </div>

      {/* Update Button */}
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleUpdate}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Update Profile
      </motion.button>
    </motion.div>
  );
};

export default ProfilePages;
