import React from "react";
import UserAppBar from "./UserAppBar";
import { Outlet, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const UserDashboard = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <UserAppBar />
      <Container maxWidth="lg">
        <Box sx={{ py: 8 }}>
          <Typography variant="h4" gutterBottom>
            Welcome to Your Dashboard
          </Typography>
          <Typography variant="body1">
            Here you can manage your account settings, view your profile, and
            access other features tailored to your needs.
          </Typography>
          {/* Example of navigation within the dashboard */}
          <Link
            to="/dashboard/settings"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="body1" component="span">
              Go to Settings &rarr;
            </Typography>
          </Link>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Outlet /> {/* This is where child routes will be rendered */}
        </Box>
      </Container>
    </Box>
  );
};

export default UserDashboard;
