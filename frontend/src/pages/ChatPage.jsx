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

  
    <div className="w-full h-screen overflow-hidden">

      {/* ANIMATED BORDER WRAPPER*/}
      <BorderAnimatedContainer>

        {/* MAIN FLEX LAYOUT */}
        <div className="flex w-full h-screen overflow-hidden rounded-2xl">

          {/* - Shows chats/contact list*/}
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

            {/*  Profile Header */}
            <ProfileHeader />

            {/* Chats / Contacts Switch */}
            <ActiveTabSwitch />

            {/*  SIDEBAR SCROLL AREA*/}
            <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 space-y-2">

              {/* 💬 SHOW CHATS OR CONTACTS */}
              {activeTab === "chats" ? (
                <ChatsList />
              ) : (
                <ContactList />
              )}

            </div>
          </div>

          {/*RIGHT CHAT AREA */}
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

            {/* CHAT CONTAINER*/}
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