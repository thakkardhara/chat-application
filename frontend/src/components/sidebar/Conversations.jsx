import Conversation from "./Conversation";
import UseGetConversations from "../../hooks/UseGetConversations";
import useConversation from "../../zustand/UseConversation";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { FaTrashAlt } from "react-icons/fa";

const Conversations = () => {
  const { loading, conversations, groups } = UseGetConversations();
  const { selectedConversation, setSelectedConversation } = useConversation();

  const loggedInUser = JSON.parse(localStorage.getItem("chat-user"));
  const loggedInUserId = loggedInUser?._id;

  const filteredConversations = conversations.filter(
    (conv) => conv._id !== loggedInUserId
  );

const handleDeleteChat = async (conversation) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this chat?"
  );
  if (!confirmDelete) return;

  try {
    const loggedInUser = JSON.parse(localStorage.getItem("chat-user"));
    const loggedInUserId = loggedInUser?._id;

    const receiverId =
      conversation._id !== loggedInUserId
        ? conversation._id
        : conversation.participants.find((id) => id !== loggedInUserId);

    const url = `https://chat-application-nod4.onrender.com/api/chat/${conversation._id}?isGroup=false&receiverId=${receiverId}`;

    const res = await fetch(url, {
      method: "DELETE",
      credentials: "include" // 🔥 sends cookie with JWT
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Chat deleted");
      // Optionally re-fetch conversations or update UI here
    } else {
      toast.error(data?.error || "Failed to delete chat");
    }
  } catch (error) {
    console.error("Error deleting chat:", error);
    toast.error("Something went wrong");
  }
};


  return (
    <div className="py-2 flex flex-col overflow-auto">
      {/* Users */}
      {filteredConversations.map((conversation, idx) => (
        <div className="flex justify-between items-center px-2 hover:bg-red-100 rounded">
          <Conversation
            conversation={conversation}
            // emoji={getRandomEmoji()}
            lastIdx={
              idx === filteredConversations.length - 1 && groups.length === 0
            }
          />
          <button
            className="text-red-500 text-lg p-2"
            title="Delete Chat"
            onClick={() => handleDeleteChat(conversation)}
          >
            <FaTrashAlt />
          </button>
        </div>
      ))}

      {/* Separator for groups */}
      {groups.length > 0 && (
        <>
          <hr className="my-2 border-t-2 border-red-400" />
          <div className="text-center text-red-400 font-bold mb-2">Groups</div>
        </>
      )}

      {/* Groups */}
      {groups.map((group, idx) => (
        <div
          key={group._id}
          className={`flex flex-col gap-1 p-2 hover:bg-red-400 rounded cursor-pointer
            ${selectedConversation?._id === group._id ? "bg-red-400" : ""}
          `}
          onClick={() =>
            setSelectedConversation({
              ...group,
              fullname: group.groupName, // for display in header
              isGroup: true,
            })
          }
        >
          <div className="font-bold text-gray-200">{group.groupName}</div>
          <div className="text-xs text-gray-300">
            Members: {group.participants.length}
          </div>
        </div>
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
