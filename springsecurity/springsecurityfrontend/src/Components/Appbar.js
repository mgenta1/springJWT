import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { useUser } from "./UserContext"; // Import the UserContext

export default function Appbar() {
  const [open, setOpen] = React.useState(false);
  const { userRole, username } = useUser(); // Get userRole and username from context

  // Log userRole and username to the console for debugging
  console.log("Current userRole:", userRole);
  console.log("Current username:", username);
  console.log("AAAAAAAAAA");

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Determine AppBar color based on user role
  let appBarColor = "#0000FF"; // Default color for not authenticated (blue)
  if (userRole === "ROLE_USER") {
    appBarColor = "#FF0000"; // Red for ROLE_USER
  } else if (userRole === "ROLE_ADMIN") {
    appBarColor = "#FFFF00"; // Yellow for ROLE_ADMIN
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/register">
            <ListItemText primary="Register" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: appBarColor }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {username ? `Welcome, ${username}` : "NAVIGATION"}
          </Typography>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
