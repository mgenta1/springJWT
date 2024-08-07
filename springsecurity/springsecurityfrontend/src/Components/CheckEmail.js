import React from "react";
import { Box, Typography, Container } from "@mui/material";

export default function CheckEmail() {
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
          Check Your Email
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          A password reset link has been sent to your email address. Please
          check your email and follow the instructions to reset your password.
        </Typography>
      </Box>
    </Container>
  );
}
