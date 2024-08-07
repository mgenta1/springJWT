import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateUser() {
  const { id } = useParams();
  const paperStyle = {
    padding: "50px 20px",
    width: 600,
    margin: "20px auto",
    backgroundColor: "#2E8B57",
  };
  const checkUsernameAvailability = async (username) => {
    try {
      const response = await fetch(
        `http://localhost:9090/api/users/check-username/${username}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      return result.exists; // Assumes the response contains { exists: boolean }
    } catch (error) {
      console.error("Check username availability error:", error);
      return false;
    }
  };

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:9090/api/user/${id}`, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setName(data.name);
        setUsername(data.username);
        setEmail(data.email);
        setPhone(data.phone);
        setAddress(data.address);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [id]);

  const handleClick = (e) => {
    e.preventDefault();
    const user = { name, username, email, phone, address };

    fetch(`http://localhost:9090/api/user/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Network response was not ok: ${text}`);
          });
        }
        return response.text();
      })
      .then(() => {
        navigate("/users");
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
        bgcolor: "black",
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
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
            <u>Update User</u>
          </h1>

          <TextField
            id="name"
            label="Name"
            variant="standard"
            fullWidth
            sx={{
              marginBottom: 2,
              input: { color: "white" },
              label: { color: "white" },
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            id="email"
            label="Email"
            variant="standard"
            fullWidth
            sx={{
              marginBottom: 2,
              input: { color: "white" },
              label: { color: "white" },
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            id="phone"
            label="Phone"
            variant="standard"
            fullWidth
            sx={{
              marginBottom: 2,
              input: { color: "white" },
              label: { color: "white" },
            }}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <TextField
            id="address"
            label="Address"
            variant="standard"
            fullWidth
            sx={{
              marginBottom: 2,
              input: { color: "white" },
              label: { color: "white" },
            }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Paper>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#00FA9A", // Custom background color
            color: "white", // Text color
            "&:hover": {
              bgcolor: "#00FA9A", // Custom color for hover state
            },
          }}
          onClick={handleClick}
        >
          Submit
        </Button>
      </Container>
    </Box>
  );
}
