import React, { useState, useEffect } from "react";
import { auth } from "../firebase/FirebaseConfig";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

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

      //  Refresh user info
      await auth.currentUser.reload();
      const updatedUser = auth.currentUser;
      setUser(updatedUser);
      setName(updatedUser.displayName);
      setPhotoURL(updatedUser.photoURL);

      Swal.fire(" Updated!", "Your profile has been updated successfully.", "success");
    } catch (error) {
      console.error("Profile update error:", error);
      Swal.fire(" Error!", "Something went wrong.", "error");
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
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow mt-10">
      <div className="flex flex-col items-center mb-6">
        <img
          src={photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-3 border-2 border-gray-300 object-cover"
        />
        <h2 className="text-xl font-bold">{user.displayName || "No Name"}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-400 mt-1">Login with: {provider}</p>
      </div>

      {/* Name */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Email:</label>
        <input
          type="email"
          value={user.email}
          disabled
          className="border p-2 w-full rounded bg-gray-100"
        />
      </div>

      {/* Photo URL */}
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

      <button
        onClick={handleUpdate}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Update Profile
      </button>
    </div>
  );
};

export default ProfilePages;
