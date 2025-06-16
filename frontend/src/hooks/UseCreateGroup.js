import { useState } from "react";
import toast from "react-hot-toast";

const UseCreateGroup = () => {
  const [loading, setLoading] = useState(false);

  const createGroup = async ({ groupName, members }) => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/group/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupName, members }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      toast.success("Group created successfully!");
      return data;
    } catch (error) {
      toast.error(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createGroup, loading };
};

export default UseCreateGroup;