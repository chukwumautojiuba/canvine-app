import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  Toolbar,
  CssBaseline,
  ListItemIcon,
  Avatar,
  Badge,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ViewCards from "./ViewCards";
import { motion } from "framer-motion";

const drawerWidth = 280;

const AdminDashboard = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
    { text: "Upload Media", path: "/admin/upload", icon: <CloudUploadIcon /> },
  ];

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "rgba(17, 17, 17, 0.95)",
        backdropFilter: "blur(10px)",
        color: "#fff",
        paddingTop: 2,
        boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background:
            "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 25px 25px, rgba(139, 92, 246, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(236, 72, 153, 0.05) 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          opacity: 0.5,
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          background:
            "linear-gradient(180deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)",
          borderRadius: "0 0 24px 24px",
          mb: 2,
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar
            sx={{
              width: 90,
              height: 90,
              background: "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
              mb: 2,
              border: "3px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                top: -5,
                left: -5,
                right: -5,
                bottom: -5,
                borderRadius: "50%",
                background: "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                zIndex: -1,
                filter: "blur(10px)",
                opacity: 0.5,
              },
            }}
          >
            C
          </Avatar>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              textAlign: "center",
              background: "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
              letterSpacing: "1px",
            }}
          >
            Canvine Admin
          </Typography>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              textAlign: "center",
              mt: 1,
              letterSpacing: "0.5px",
            }}
          >
            Welcome back, Admin
          </Typography>
        </motion.div>
      </Box>

      <List sx={{ px: 2, position: "relative", zIndex: 1 }}>
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ListItem
              button
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path ? "#8B5CF6" : "#fff",
                background:
                  location.pathname === item.path
                    ? "rgba(139, 92, 246, 0.15)"
                    : "transparent",
                borderRadius: "12px",
                margin: "8px 0",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.1)",
                  transform: "translateX(5px)",
                  "&::before": {
                    opacity: 1,
                  },
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(90deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? "#8B5CF6" : "#fff",
                  minWidth: 40,
                  transition: "all 0.3s ease",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiTypography-root": {
                    fontWeight:
                      location.pathname === item.path ? "bold" : "normal",
                    letterSpacing: "0.5px",
                  },
                }}
              />
              {location.pathname === item.path && (
                <Box
                  sx={{
                    width: 4,
                    height: 24,
                    background: "linear-gradient(to bottom, #8B5CF6, #EC4899)",
                    borderRadius: "2px",
                    boxShadow: "0 0 10px rgba(139, 92, 246, 0.5)",
                  }}
                />
              )}
            </ListItem>
          </motion.div>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          my: 2,
          position: "relative",
          zIndex: 1,
        }}
      />

      <List sx={{ px: 2, position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <ListItem
            button
            sx={{
              color: "#fff",
              borderRadius: "12px",
              margin: "8px 0",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.1)",
                transform: "translateX(5px)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <ListItem
            button
            sx={{
              color: "#fff",
              borderRadius: "12px",
              margin: "8px 0",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.1)",
                transform: "translateX(5px)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <ListItem
            button
            sx={{
              color: "#ff4d4d",
              borderRadius: "12px",
              margin: "8px 0",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "rgba(255, 77, 77, 0.1)",
                transform: "translateX(5px)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#ff4d4d", minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </motion.div>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              position: "fixed",
              top: 16,
              left: 16,
              zIndex: 1200,
              color: "#fff",
              background: "rgba(17, 17, 17, 0.95)",
              backdropFilter: "blur(10px)",
              padding: "12px",
              borderRadius: "12px",
              transition: "all 0.3s ease",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              boxShadow: "0 0 15px rgba(139, 92, 246, 0.2)",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.1)",
                transform: "scale(1.05)",
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              "& .MuiDrawer-paper": {
                width: "80%",
                boxSizing: "border-box",
                background: "rgba(17, 17, 17, 0.95)",
                backdropFilter: "blur(10px)",
              },
            }}
          >
            {drawer}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              background: "rgba(17, 17, 17, 0.95)",
              backdropFilter: "blur(10px)",
            },
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          background: "linear-gradient(180deg, #000000 0%, #1a1a1a 100%)",
          minHeight: "100vh",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 25px 25px, rgba(139, 92, 246, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(236, 72, 153, 0.05) 2%, transparent 0%)",
            backgroundSize: "100px 100px",
            opacity: 0.5,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
            background:
              "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)",
            zIndex: 0,
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          {location.pathname === "/admin" && <ViewCards />}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
