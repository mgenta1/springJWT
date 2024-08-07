// src/components/RoleSelection.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";

export default function RoleSelection() {
  const navigate = useNavigate();
  const roles = JSON.parse(localStorage.getItem("userRole"));

  const handleRoleSelection = (role) => {
    if (role === "ROLE_ADMIN") {
      navigate("/admin/users");
    } else if (role === "ROLE_USER") {
      navigate("/home");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Select Role
        </Typography>
        {roles.map((role) => (
          <Button
            key={role}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleRoleSelection(role)}
          >
            Access as {role === "ROLE_ADMIN" ? "Admin" : "User"}
          </Button>
        ))}
      </Box>
    </Container>
  );
}
