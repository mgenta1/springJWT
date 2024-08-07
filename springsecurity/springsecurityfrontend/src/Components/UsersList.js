import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    backgroundColor: "black",
    color: "green",
  },
  "& .MuiDialogTitle-root": {
    backgroundColor: "black",
    color: "green",
  },
  "& .MuiDialogActions-root": {
    backgroundColor: "black",
  },
}));

const CustomButton = styled(Button)(({ variant }) => ({
  ...(variant === "cancel" && {
    color: "white",
    borderColor: "white",
  }),
  ...(variant === "deactivate" && {
    color: "orange",
    borderColor: "orange",
  }),
}));

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userToDeactivate, setUserToDeactivate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:9090/api/users", {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((result) => {
        setUsers(result);
        setFilteredUsers(result);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredUsers(
        users.filter((user) =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(users);
    }
  }, [searchQuery, users]);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleDeactivate = (id) => {
    setUserToDeactivate(id);
    setDialogOpen(true);
  };

  const confirmDeactivate = () => {
    fetch(`http://localhost:9090/api/user/deactivate/${userToDeactivate}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ active: false }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        setUsers(
          users.map((user) =>
            user.id === userToDeactivate ? { ...user, active: false } : user
          )
        );
        setFilteredUsers(
          filteredUsers.map((user) =>
            user.id === userToDeactivate ? { ...user, active: false } : user
          )
        );
        setDialogOpen(false);
        setUserToDeactivate(null);
      })
      .catch((error) => {
        console.error("Deactivate error:", error);
      });
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setUserToDeactivate(null);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 2,
          bgcolor: "black",
          color: "white",
          padding: 2,
        }}
      >
        <TextField
          id="search"
          label="Search by Username"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2, bgcolor: "white", color: "black" }}
        />
      </Box>

      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
          ></ListSubheader>
        }
      >
        {filteredUsers.map((user, index) => (
          <div key={user.id}>
            <ListItemButton
              onClick={() => handleClick(index)}
              sx={{
                bgcolor: "black",
                color: "white",
                borderBottom: "1px solid green",
                "&:hover": { bgcolor: "black", color: "green" },
              }}
            >
              <ListItemText
                primary={user.username}
                sx={{
                  color: user.active ? "white" : "red",
                }}
              />
              {openIndex === index ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
              <Box sx={{ width: "100%", pl: 2, pr: 2, bgcolor: "black" }}>
                <Button
                  variant="contained"
                  sx={{
                    mb: 1,
                    bgcolor: "grey",
                    color: "white",
                    "&:hover": { bgcolor: "green" },
                  }}
                  fullWidth
                  component={Link}
                  to={`/admin/user-details/${user.id}`}
                >
                  Details
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    mb: 1,
                    bgcolor: "grey",
                    color: "white",
                    "&:hover": { bgcolor: "blue" },
                  }}
                  fullWidth
                  component={Link}
                  to={`/admin/update-user/${user.id}`}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "grey",
                    color: "white",
                    "&:hover": { bgcolor: "orange" },
                  }}
                  fullWidth
                  onClick={() => handleDeactivate(user.id)}
                >
                  Deactivate
                </Button>
              </Box>
            </Collapse>
          </div>
        ))}
      </List>

      <CustomDialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deactivation</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to deactivate this user?
          </Typography>
        </DialogContent>
        <DialogActions>
          <CustomButton variant="cancel" onClick={handleCloseDialog}>
            Cancel
          </CustomButton>
          <CustomButton variant="deactivate" onClick={confirmDeactivate}>
            Deactivate
          </CustomButton>
        </DialogActions>
      </CustomDialog>
    </>
  );
};

export default UsersList;
