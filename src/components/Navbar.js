import React, { useContext, useState } from "react";
import { 
  AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, Divider 
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material"; // Hamburger menu icon
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile menu state

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  // Navigation links based on user role
  const getNavLinks = () => {
    if (!user) return [];
    
    let links = [
      { text: "Dashboard", path: "/dashboard" }
    ];

    if (user.role === "super_admin") {
      links.push({ text: "Manage Hospitals", path: "/manage-hospitals" });
      links.push({ text: "Manage Admins", path: "/manage-admins" });
    }

    if (user.role === "admin") {
      links.push({ text: "Manage Doctors", path: "/manage-doctors" });
      links.push({ text: "Manage Patients", path: "/manage-patients" });
    }

    if (user.role === "doctor") {
      links.push({ text: "Patients", path: "/patients" });
      links.push({ text: "Prescribe", path: "/prescribe" });
    }

    links.push({ text: "Logout", action: handleLogout });

    return links;
  };

  return (
    <>
      {/* Main Navbar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Hamburger Menu Icon for Mobile */}
          {user && (
            <IconButton 
              edge="start" 
              color="inherit" 
              aria-label="menu" 
              sx={{ display: { xs: "block", md: "none" } }} 
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Navbar Title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
              {user ? `${user.hospital.name} - ${user.name} (${user.role})` : "Dawa Chat"}
            </Link>
          </Typography>

          {/* Desktop Navigation Links (Hidden on Small Screens) */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {user ? (
              getNavLinks().map((link, index) =>
                link.action ? (
                  <Button key={index} color="inherit" onClick={link.action}>
                    {link.text}
                  </Button>
                ) : (
                  <Button key={index} color="inherit" onClick={() => navigate(link.path)}>
                    {link.text}
                  </Button>
                )
              )
            ) : (
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer for Navigation */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <Typography variant="h6" sx={{ p: 2, textAlign: "center" }}>
            {user ? `${user.hospital.name} - ${user.name}` : "Dawa Chat"}
          </Typography>
          <Divider />
          <List>
            {getNavLinks().map((link, index) => (
              <ListItem button key={index} onClick={link.action || (() => navigate(link.path))}>
                <ListItemText primary={link.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
