import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import Button from "@mui/material/Button";

const UserAppBar = () => {
  const { username, userId, userRole } = useUser();

  const navigate = useNavigate();
  console.log("UserAppBar/username:", username);
  console.log("UserAppBar/id:", userId);
  console.log("UserAppBar/roles:", userRole);
  const handleViewDetails = () => {
    window.location.href = `/home/logged-user-details/${userId}`;
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:9090/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Clear localStorage or any other logout handling
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "BLUE" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome
          </Typography>
          <Button color="inherit" onClick={handleViewDetails}>
            View Details
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default UserAppBar;
