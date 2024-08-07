import React, { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("userRole");

    if (storedUsername) setUsername(storedUsername);
    if (storedUserId) setUserId(storedUserId);
    if (storedRole) setUserRole(storedRole.split(","));
  }, []);

  return (
    <UserContext.Provider value={{ username, userId, userRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserContext; // Export UserContext as default
