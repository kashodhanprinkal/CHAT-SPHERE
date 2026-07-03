import React, { useState, useRef, useEffect } from "react";
import { 
  MoreVertical, 
  User, 
  Bell, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeOff, 
  HelpCircle, 
  Shield, 
  LogOut,
  Settings,
  ChevronRight
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useNavigate } from "react-router-dom";

const SettingsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  
  const { logout, authUser } = useAuthStore();
  const { theme, toggleTheme, isSoundEnabled, toggleSound } = useChatStore();

  // ✅ Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Menu items
  const menuItems = [
    {
      id: "profile",
      icon: <User className="w-4 h-4" />,
      label: "Profile",
      onClick: () => navigate("/profile"),
    },
    {
      id: "notifications",
      icon: <Bell className="w-4 h-4" />,
      label: "Notifications",
      onClick: () => navigate("/settings/notifications"),
    },
    {
      id: "theme",
      icon: theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />,
      label: theme === "light" ? "Dark Mode" : "Light Mode",
      onClick: toggleTheme,
      toggle: true,
    },
    {
      id: "sound",
      icon: isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeOff className="w-4 h-4" />,
      label: isSoundEnabled ? "Sound On" : "Sound Off",
      onClick: toggleSound,
      toggle: true,
    },
    { divider: true },
    {
      id: "help",
      icon: <HelpCircle className="w-4 h-4" />,
      label: "Help & Support",
      onClick: () => navigate("/help"),
    },
    {
      id: "privacy",
      icon: <Shield className="w-4 h-4" />,
      label: "Privacy Policy",
      onClick: () => navigate("/privacy"),
    },
    { divider: true },
    {
      id: "logout",
      icon: <LogOut className="w-4 h-4" />,
      label: "Logout",
      onClick: () => {
        if (window.confirm("Are you sure you want to logout?")) {
          logout();
        }
      },
      danger: true,
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      
      {/* Three-dot button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors p-1 rounded-lg hover:bg-[var(--bg-hover)]"
        aria-label="Settings menu"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* User info header */}
          <div className="px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-hover)]">
            <div className="flex items-center gap-3">
              <img
                src={authUser?.profilePic || "/avatar.png"}
                alt={authUser?.fullName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                  {authUser?.fullName}
                </p>
                <p className="text-xs text-[var(--text-muted)] truncate">
                  {authUser?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-1">
            {menuItems.map((item, index) => {
              if (item.divider) {
                return (
                  <div key={index} className="my-1 border-t border-[var(--border-color)]" />
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors
                    ${item.danger 
                      ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30" 
                      : "text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                    }
                  `}
                >
                  <span className={item.danger ? "text-red-500" : "text-[var(--text-secondary)]"}>
                    {item.icon}
                  </span>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.toggle ? (
                    <span className="text-[var(--text-muted)] text-xs">
                      {item.label === "Dark Mode" ? "OFF" : item.label === "Light Mode" ? "ON" : ""}
                    </span>
                  ) : (
                    <ChevronRight className="w-3 h-3 text-[var(--text-muted)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;