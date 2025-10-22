import React, { useState } from "react";
import { AuthenticationContext } from "./AuthenticationContext";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";

// Initialize providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Create user with email/password
  const createUserWithEmailAndPasswordFunc = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update profile of the current user
  const updateProfileFunc = (displayName, photoUrl) => {
    if (!user) {
      throw new Error("No user is currently logged in");
    }
    return updateProfile(user, { displayName, photoURL: photoUrl });
  };

  // Sign in with email/password
  const signInWithEmailAndPasswordFunc = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Google
  const signInWithGoogleFunc = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Sign in with GitHub
  const signInWithGithubFunc = () => {
    return signInWithPopup(auth, githubProvider);
  };

  // Sign out user
  const signOutUserFunc = () => {
    return signOut(auth);
  };

  // Send password reset email
  const endPassResetEmailFunc = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Export all functions via context
  const authInfo = {
    user,
    setUser,
    createUserWithEmailAndPasswordFunc,
    signInWithEmailAndPasswordFunc,
    signInWithGoogleFunc,
    signInWithGithubFunc,
    signOutUserFunc,
    endPassResetEmailFunc,
    updateProfileFunc,
  };

  return (
    <AuthenticationContext.Provider value={authInfo}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthProvider;
