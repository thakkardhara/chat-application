import React, { useState } from "react";
import UseCreateGroup from "../../hooks/UseCreateGroup";
import UseGetConversations from "../../hooks/UseGetConversations";
import { useAuthContext } from "../../context/AuthContext";

const CreateGroup = () => {
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { createGroup, loading } = UseCreateGroup();
  const { conversations } = UseGetConversations();
  const { authUser } = useAuthContext();

  const handleCheckbox = (userId) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!groupName || selectedMembers.length < 1) {
      return;
    }
    // Don't include self, backend will add admin automatically
    await createGroup({ groupName, members: selectedMembers });
    setGroupName("");
    setSelectedMembers([]);
    setShowModal(false);
  };

  return (
    <div className="mb-4">
      <button
        className="btn bg-red-400 text-white w-full"
        onClick={() => setShowModal(true)}
      >
        + Create Group
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Create New Group</h2>
            <form onSubmit={handleCreate}>
              <input
                type="text"
                className="input input-bordered w-full mb-4"
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
              <div className="mb-4 max-h-32 overflow-y-auto">
                <p className="font-semibold mb-2">Add Members:</p>
                {conversations
                  .filter((u) => u._id !== authUser._id)
                  .map((user) => (
                    <label
                      key={user._id}
                      className="flex items-center gap-2 mb-1"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(user._id)}
                        onChange={() => handleCheckbox(user._id)}
                      />
                      <span>{user.fullname}</span>
                    </label>
                  ))}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGroup;
