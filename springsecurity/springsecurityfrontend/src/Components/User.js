import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Paper } from "@mui/material";

export default function User() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Container>
        <Paper elevation={3} style={paperStyle}>
          <h1 style={{ color: "blue" }}>
            <u>Add Student</u>
          </h1>

          <TextField
            id="standard-basic"
            label="User Name"
            variant="standard"
            fullWidth
            style={{ marginBottom: "20px" }}
          />

          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            fullWidth
          />
        </Paper>
      </Container>
    </Box>
  );
}
