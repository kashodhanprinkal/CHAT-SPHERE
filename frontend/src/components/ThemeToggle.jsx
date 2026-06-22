import React from "react";
import { Sun, Moon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useChatStore();

  return (
    <button
      onClick={toggleTheme}
      className="text-slate-400 hover:text-cyan-400 transition-colors"
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      {theme === "light" ? (
        <Moon className="size-5" />
      ) : (
        <Sun className="size-5 text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;