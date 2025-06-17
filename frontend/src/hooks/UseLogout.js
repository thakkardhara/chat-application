import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
const UseLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setauthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    // const token = Cookies.get("jwt");
    try {
      const res = await fetch('https://chat-application-nod4.onrender.com/api/auth/logout', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}`
        }
      , credentials: "include"
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("chat-user");
      setauthUser(null);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
}

export default UseLogout;
