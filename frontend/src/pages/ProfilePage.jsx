import React, { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import {
  User,
  Camera,
  Save,
  Trash2,
  Loader,
  Eye,
  EyeOff,
  ArrowLeft,
  PenSquare,
} from "lucide-react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { authUser, updateProfile, updateProfilePic, changePassword, deleteAccount } = useAuthStore();
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({ 
    current: false, 
    new: false, 
    confirm: false 
  });
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Profile form
  const [profileData, setProfileData] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
  });

  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(profileData);
    } catch (error) {
      // Error handled in store
    } finally {
      setLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      // Error handled in store
    } finally {
      setLoading(false);
    }
  };

  // Handle profile picture upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setSelectedFile(URL.createObjectURL(file));
    setLoading(true);
    try {
      await updateProfilePic(file);
    } catch (error) {
      // Error handled in store
    } finally {
      setLoading(false);
    }
  };

  // Handle delete account
  const handleDeleteAccount = async () => {
    if (window.confirm("⚠️ Are you sure? This cannot be undone!")) {
      await deleteAccount();
    }
  };

  if (!authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-[var(--accent)]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Profile Settings</h1>
        </div>

        {/* Main Card */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm">
          
          {/*📸 AVATAR SECTION*/}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={selectedFile || authUser?.profilePic || "/avatar.png"}
                alt={authUser?.fullName}
                className="w-24 h-24 rounded-full object-cover border-4 border-[var(--accent)]"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 bg-[var(--accent)] rounded-full text-white hover:scale-105 transition-transform"
                disabled={loading}
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <p className="text-sm text-[var(--text-muted)] mt-2">Click camera icon to change photo</p>
          </div>

          {/*👤 PROFILE FORM*/}
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Bio
              </label>
              <div className="relative">
                <PenSquare className="absolute left-3 top-3 w-4 h-4 text-[var(--text-muted)]" />
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  rows="3"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                {profileData.bio?.length || 0}/150 characters
              </p>
            </div>

            {/* Save Profile Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Profile
            </button>
          </form>

    
          {/*🔐 CHANGE PASSWORD */}  🔐 CHANGE PASSWORD
          <div className="mt-8 pt-8 border-t border-[var(--border-color)]">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Change Password</h3>
            
            <form onSubmit={handlePasswordChange} className="space-y-4">
              
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full pr-10 py-2.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  >
                    {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full pr-10 py-2.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition"
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  >
                    {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full pr-10 py-2.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  >
                    {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Change Password Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg border border-[var(--border-color)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-hover)] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                Change Password
              </button>
            </form>
          </div>

          {/* ============================================================
              ⚠️ DANGER ZONE
          ============================================================ */}
          <div className="mt-8 pt-8 border-t-2 border-red-500/20">
            <h3 className="text-lg font-semibold text-red-500 mb-4">⚠️ Danger Zone</h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              Once you delete your account, all data will be permanently removed.
            </p>
            <button
              onClick={handleDeleteAccount}
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;