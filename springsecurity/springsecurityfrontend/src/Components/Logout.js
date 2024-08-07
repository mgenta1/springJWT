import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

const Logout = () => {
  const { setUsername, setUserId, setUserRole } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const response = await fetch("http://localhost:9090/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Logout failed");
        }

        // Clear local storage
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");

        // Reset user context
        setUsername(null);
        setUserId(null);
        setUserRole(null);

        // Redirect to login page
        navigate("/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    performLogout();
  }, [setUsername, setUserId, setUserRole, navigate]);

  return null;
};

export default Logout;
