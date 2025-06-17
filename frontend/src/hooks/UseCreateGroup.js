import { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const UseCreateGroup = () => {
  const [loading, setLoading] = useState(false);

  const createGroup = async ({ groupName, members }) => {
    setLoading(true);
    // const token = Cookies.get("jwt");
    try {
      const res = await fetch('https://chat-application-nod4.onrender.com/api/group/create', {
        method: "POST",
        credentials: "include",
      headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}` 
        },
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