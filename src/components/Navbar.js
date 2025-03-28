import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Only show the navbar if user is NOT authenticated
  if (user) return null;

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Dawa Chat
          </Link>
        </Typography>

        <Box>
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
