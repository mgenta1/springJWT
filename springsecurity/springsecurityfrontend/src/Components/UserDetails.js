import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation"; // Import the NavigationIcon

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "black",
        color: "green",
        padding: 2,
        position: "relative",
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
              image="/avatar.jpg" // Correct path to your image in the public folder
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
        onClick={() => navigate("/admin/users")}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        Back to Admin Dashboard
      </Fab>
    </Box>
  );
};

export default UserDetails;
