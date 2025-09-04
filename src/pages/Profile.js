import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getDoc(doc(db, "users", user.uid))
        .then((docSnap) => {
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          } else {
            setError("Profile not found. Please complete signup.");
          }
        })
        .catch((err) => {
          setError("Error loading profile: " + err.message);
        });
    }
  }, [user]);

  const handleLogout = () => {
    toast.success("User logged out successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(async () => {
      await logout();
      navigate("/login");
    }, 3000);
  };

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        {error}
        <ToastContainer />
      </div>
    );
  if (!profile)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
        <ToastContainer />
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <ToastContainer />
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg flex flex-col items-center">
        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 flex items-center justify-center mb-6 shadow-lg">
          <img
            src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=6D28D9&color=fff&size=128`}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
          />
        </div>
        <h2 className="sm:text-3xl text-[16px] font-bold text-gray-800 mb-2 text-center">
          {profile.name}
        </h2>
        <p className="text-gray-500 text-[14px] sm:text-lg mb-6 text-center">
          {profile.email}
        </p>
        <div className="w-full flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 shadow">
            <span className="font-medium text-gray-600 text-[14px]">Mobile</span>
            <span className="font-semibold text-gray-800 text-[14px]">
              {profile.mobile}
            </span>
          </div>
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 shadow">
            <span className="font-medium text-gray-600 text-[14px]">Date of Birth</span>
            <span className="font-semibold text-gray-800 text-[14px]">
              {profile.dob}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-indigo-500 text-[14px] to-purple-500 text-white py-2 sm:py-3 rounded-xl font-semibold text-lg shadow hover:from-indigo-600 hover:to-purple-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
