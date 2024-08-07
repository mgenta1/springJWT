import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; // Import the UserContext
import Button from "@mui/material/Button";

const AdminAppBar = () => {
  const { username } = useUser(); // Get username from context
  const navigate = useNavigate();

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
      <AppBar position="static" sx={{ backgroundColor: "BLACK" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome, {username || "Admin"}
          </Typography>
          <Link
            to="/admin/users"
            style={{ color: "white", textDecoration: "none", margin: "0 10px" }}
          >
            Users List
          </Link>
          <Link
            to="/admin/affect-role"
            style={{ color: "white", textDecoration: "none", margin: "0 10px" }}
          >
            Affect Role
          </Link>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AdminAppBar;
