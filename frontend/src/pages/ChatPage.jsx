import React from "react";
import { useChatStore } from "../store/useChatStore.js";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ActiveTabSwitch from "../components/ActiveTabSwitch.jsx";
import ChatsList from "../components/ChatsList.jsx";
import ContactList from "../components/ContactList.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import NoConversationPlaceHolder from "../components/NoConversationPlaceHolder.jsx";

function ChatPage() {
  // =========================
  // 📦 CHAT STORE STATES
  // =========================
  const { activeTab, selectedUser } = useChatStore();

  return (

    // =========================
    // 🌍 MAIN PAGE CONTAINER
    // h-screen -> fixed full screen
    // overflow-hidden -> prevents full page scrolling
    // =========================
    <div className="w-full h-screen overflow-hidden">

      {/* =========================
          ✨ ANIMATED BORDER WRAPPER
      ========================= */}
      <BorderAnimatedContainer>

        {/* =========================
            🧱 MAIN FLEX LAYOUT
            Left Sidebar + Right Chat
        ========================= */}
        <div className="flex w-full h-screen overflow-hidden rounded-2xl">

          {/* ======================================================
              🟣 LEFT SIDEBAR
              - Shows chats/contact list
              - Hidden on mobile when chat is open
          ====================================================== */}
          <div
            className={`
              flex flex-col
              bg-slate-800/50
              backdrop-blur-sm
              border-r border-white/10
              transition-all duration-300

              ${
                selectedUser
                  ? "hidden md:flex md:w-80"
                  : "flex w-full md:w-80"
              }
            `}
          >

            {/* 👤 Profile Header */}
            <ProfileHeader />

            {/* 🔄 Chats / Contacts Switch */}
            <ActiveTabSwitch />

            {/* =========================
                📜 SIDEBAR SCROLL AREA
                min-h-0 -> fixes flex overflow issue
                overflow-y-auto -> scroll only this area
            ========================= */}
            <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 space-y-2">

              {/* 💬 SHOW CHATS OR CONTACTS */}
              {activeTab === "chats" ? (
                <ChatsList />
              ) : (
                <ContactList />
              )}

            </div>
          </div>

          {/* ======================================================
              🔵 RIGHT CHAT AREA
              - Shows selected conversation
              - Hidden on mobile until user selects chat
          ====================================================== */}
          <div
            className={`
              flex flex-col
              bg-slate-900/50
              backdrop-blur-sm
              flex-1
              h-full
              overflow-hidden

              ${
                !selectedUser
                  ? "hidden md:flex"
                  : "flex"
              }
            `}
          >

            {/* =========================
                💬 CHAT CONTAINER
            ========================= */}
            {selectedUser ? (
              <ChatContainer />
            ) : (

              // 📭 Empty placeholder when no chat selected
              <NoConversationPlaceHolder />
            )}

          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;