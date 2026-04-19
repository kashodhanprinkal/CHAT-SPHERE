import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UserLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const {
    getAllContacts,
    allContacts,
    setSelectedUser,
    isUsersLoading,
    selectedUser,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, []);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  if (!allContacts || allContacts.length === 0) {
    return (
      <div className="text-center text-slate-400 mt-10">
        No contacts found
      </div>
    );
  }

  return (
    <div className="space-y-3 p-4">
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          onClick={() => setSelectedUser(contact)}
          className={`p-4 rounded-lg cursor-pointer transition-colors ${
            selectedUser?._id === contact._id
              ? "bg-cyan-500/30"
              : "bg-cyan-500/10 hover:bg-cyan-500/20"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`avatar ${
                onlineUsers?.includes(contact._id)
                  ? "online"
                  : "offline"
              }`}
            >
              <div className="size-12 rounded-full">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                />
              </div>
            </div>

            <div>
              <h4 className="text-slate-200 font-medium">
                {contact.fullName}
              </h4>
              <p className="text-xs text-slate-400">
                {onlineUsers?.includes(contact._id)
                  ? "Online"
                  : "Offline"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactList;