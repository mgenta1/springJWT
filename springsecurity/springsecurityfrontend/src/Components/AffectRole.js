import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button, MenuItem } from "@mui/material";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation"; // Import the NavigationIcon
import { useNavigate } from "react-router-dom";

export default function RoleAssignment() {
  const paperStyle = {
    padding: "50px 20px",
    width: 600,
    margin: "20px auto",
    backgroundColor: "#2E8B57",
  };
  const navigate = useNavigate(); // Initialize navigate

  const [username, setUsername] = useState("");
  const [roleName, setRoleName] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9090/api/roles")
      .then((response) => response.json())
      .then((data) => {
        setRoles(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const handleRoleAssignment = (e) => {
    e.preventDefault();
    const roleToUserForm = { username, roleName };

    fetch("http://localhost:9090/api/role/affect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roleToUserForm),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Network response was not ok: ${text}`);
          });
        }
        return response.text();
      })
      .then((data) => {
        console.log("Role assigned successfully");
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "#000000",
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleRoleAssignment}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={3} sx={paperStyle}>
          <h1 style={{ color: "#00FA9A", textAlign: "center" }}>
            <u>Assign Role to User</u>
          </h1>

          <TextField
            id="username"
            label="Username"
            variant="standard"
            fullWidth
            sx={{
              marginBottom: 2,
              input: { color: "white" },
              label: { color: "white" },
            }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            id="role"
            label="Role"
            select
            variant="standard"
            fullWidth
            sx={{
              marginBottom: 2,
              input: { color: "white" },
              label: { color: "white" },
            }}
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.name}>
                {role.name}
              </MenuItem>
            ))}
          </TextField>
        </Paper>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#00FA9A",
            color: "white",
            "&:hover": {
              bgcolor: "#00FA9A",
            },
          }}
          type="submit"
        >
          Assign Role
        </Button>
      </Container>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        sx={{
          position: "absolute",
          bottom: 16,
          left: 16,
        }}
        onClick={() => navigate("/admin/users")}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        Back to Admin Dashboard
      </Fab>
    </Box>
  );
}
