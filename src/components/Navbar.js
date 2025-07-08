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
      <Toolbar sx={{ background: 'linear-gradient(135deg, #e3f2fd, #fff)' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img 
              src="dawaChat_logo.png" 
              alt="dawaChat"
              style={{ height: 50, verticalAlign: 'middle' }}
            />
          </Link>
        </Typography>

        <Box>
          <Button style={{ color: "#1976d2" }} onClick={() => navigate("/login")}>
            Login
          </Button>
        </Box>
      </Toolbar>
</AppBar>

  );
};

export default Navbar;
