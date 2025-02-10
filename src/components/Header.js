import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null; // Only show the header when the user is logged in

  const handleLogout = () => {
    logout();
    window.location.href = "/"; // Redirect to home after logout
  };

  return (
    <AppBar position="static" color="primary"> 
      <Toolbar>
        {/* Push user details slightly to the right */}
        <Box sx={{ flexGrow: 1, ml: 8 }}>  
          <Typography variant="h6">
            {user.hospital.name} - {user.name} ({user.role})
          </Typography>
        </Box>

        {/* Logout Button on the far right */}
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
