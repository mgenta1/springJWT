import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { useUser } from "./UserContext"; // Import the UserContext
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation"; // Import the NavigationIcon

import { useParams, useNavigate } from "react-router-dom";

const LoggedUserDetails = () => {
  const { userId } = useUser(); // Get userId from context
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:9090/api/user/${userId}`, {
        method: "POST",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [userId]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#EDEADE",
        color: "green",
        padding: 2,
      }}
    >
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="red">Error: {error}</Typography>
      ) : user ? (
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="/avatar.jpg"
              alt="User Image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {user.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {user.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Name: {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {user.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: {user.phone}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Address: {user.address}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ) : (
        <Typography>User not found</Typography>
      )}

      <Fab
        variant="extended"
        size="medium"
        color="primary"
        sx={{
          position: "absolute",
          bottom: 16,
          left: 16,
        }}
        onClick={() => navigate("/home")}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        Back to Home
      </Fab>
    </Box>
  );
};

export default LoggedUserDetails;
