import { createContext, useContext, useEffect, useState } from "react";
import { getMeUser } from "../services/authService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH USER
 const fetchUser = async () => {
  try {
    setLoading(true); // 🔥 ensure loading starts

    const res = await getMeUser();
    setUser(res.data);
  } catch (error) {
    console.error("User fetch error:", error);

    localStorage.removeItem("token");
    setUser(null);
  } finally {
    setLoading(false);
  }
};

  // ✅ INITIAL LOAD (ONLY ONCE)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    fetchUser();
  }, []);

  // 🔥 NEW: CALL THIS AFTER LOGIN / GOOGLE LOGIN
  const loginUserContext = async () => {
    setLoading(true);
    await fetchUser();
  };

  // 🔥 LOGOUT FUNCTION (optional but useful)
 const logoutUser = () => {
  localStorage.removeItem("token");
  setUser(null);
  setLoading(false); // 🔥 important
};

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        loginUserContext, 
        logoutUser,       
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// custom hook
export const useUser = () => useContext(UserContext);