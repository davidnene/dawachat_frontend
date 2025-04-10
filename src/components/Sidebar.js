import React, { useContext, useState } from "react";
import { 
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, 
  IconButton, Box, useMediaQuery 
} from "@mui/material";
import { Dashboard, LocalHospital, People, Person, Description, Logout, Menu as MenuIcon, HealthAndSafety } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useTheme } from "@mui/material/styles";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  // Detect screen size
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // True for mobile screens

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getNavLinks = () => {
    if (!user) return [];

    let links = [{ text: "Dashboard", path: "/dashboard", icon: <Dashboard /> }];

    if (user.role === "super_admin") {
      links.push({ text: "Manage Hospitals", path: "/manage-hospitals", icon: <LocalHospital /> });
      links.push({ text: "Manage Admins", path: "/manage-admins", icon: <People /> });
    }

    if (user.role === "admin") {
      links.push({ text: "Manage Doctors", path: "/manage-doctors", icon: <Person /> });
      links.push({ text: "Manage Patients", path: "/manage-patients", icon: <People /> });
      links.push({ text: "Doctor Stress Logs", path: "/stress-logs", icon: <HealthAndSafety /> });
    }

    if (user.role === "doctor") {
      links.push({ text: "Patients", path: "/patients", icon: <People /> });
      links.push({ text: "Prescribe", path: "/prescribe", icon: <Description /> });
    }

    links.push({ text: "Logout", action: handleLogout, icon: <Logout /> });

    return links;
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <IconButton 
          sx={{ position: "absolute", top: 10, left: 10, zIndex: 1300 }} 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <MenuIcon sx={{ color: "black" }} />
        </IconButton>
      )}

      {/* Sidebar (Responsive for Mobile & Desktop) */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"} // Temporary for mobile, permanent for desktop
        open={sidebarOpen || !isMobile} // Always open on large screens
        onClose={() => setSidebarOpen(false)}
        onMouseEnter={() => !isMobile && setSidebarOpen(true)} 
        onMouseLeave={() => !isMobile && setSidebarOpen(false)} // Collapse on hover-out (only for desktop)
        sx={{
          "& .MuiDrawer-paper": {
            width: sidebarOpen ? 250 : isMobile ? 0 : 60, 
            transition: "width 0.3s ease-in-out",
            overflowX: "hidden",
          },
        }}
      >
        <Box sx={{ width: sidebarOpen ? 250 : 60, textAlign: "center", mt: 2 }}>
          {/* Sidebar Icon */}
          {!isMobile && (
            <IconButton sx={{ color: "#1876D3" }}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        {/* Sidebar Navigation */}
        <List>
          {getNavLinks().map((link, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={link.action || (() => navigate(link.path))}>
                <ListItemIcon sx={{ color: "#1876D3" }}>{link.icon}</ListItemIcon>
                {sidebarOpen && <ListItemText primary={link.text} />} {/* Show text only when expanded */}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
