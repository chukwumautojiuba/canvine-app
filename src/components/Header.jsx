import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Paper,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Container,
  Avatar,
  Badge,
  Tooltip,
  Fade,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import MediaCard from "./MediaCard";
import { fetchMedias } from "../services/api";
import { useTheme } from "@mui/material/styles";

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { scrollY } = useScroll();
  const ySpring = useSpring(scrollY, { stiffness: 100, damping: 20 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = ySpring.on("change", (latest) => {
      setScrolled(latest > 100);
    });
    return () => unsubscribe();
  }, [ySpring]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredResults([]);
      setShowDropdown(false);
      return;
    }

    const fetchResults = async () => {
      try {
        const results = await fetchMedias(searchTerm);
        setFilteredResults(results);
        setShowDropdown(results.length > 0);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setFilteredResults([]);
      }
    };

    const debounceTimeout = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Images", icon: <CategoryIcon />, path: "/medias" },
  ];

  const [anchorEl, setAnchorEl] = useState(null);

  const isLoggedIn = localStorage.getItem("username") !== null;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    handleMenuClose();
    navigate("/");
  };

  const handleLogin = () => {
    handleMenuClose();
    navigate("/login");
  };

  const handleSignUp = () => {
    handleMenuClose();
    navigate("/signup");
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      TransitionComponent={Fade}
      slotProps={{
        paper: {
          sx: {
            mt: 1.5,
            background: "rgba(17, 17, 17, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            minWidth: 200,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          },
        },
      }}
    >
      {isLoggedIn ? (
        <>
          <MenuItem
            onClick={handleMenuClose}
            component={Link}
            to="/profile"
            sx={{
              py: 1.5,
              "&:hover": {
                background: "rgba(139, 92, 246, 0.1)",
              },
            }}
          >
            <AccountCircleIcon sx={{ mr: 2, color: "#8B5CF6" }} />
            <Typography sx={{ color: "#fff" }}>Profile</Typography>
          </MenuItem>
          <Divider sx={{ borderColor: "rgba(139, 92, 246, 0.1)" }} />
          <MenuItem
            onClick={handleLogout}
            sx={{
              py: 1.5,
              "&:hover": {
                background: "rgba(236, 72, 153, 0.1)",
              },
            }}
          >
            <LogoutIcon sx={{ mr: 2, color: "#EC4899" }} />
            <Typography sx={{ color: "#fff" }}>Logout</Typography>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem
            onClick={handleLogin}
            sx={{
              py: 1.5,
              "&:hover": {
                background: "rgba(139, 92, 246, 0.1)",
              },
            }}
          >
            <LoginIcon sx={{ mr: 2, color: "#8B5CF6" }} />
            <Typography sx={{ color: "#fff" }}>Login</Typography>
          </MenuItem>
          <Divider sx={{ borderColor: "rgba(139, 92, 246, 0.1)" }} />
          <MenuItem
            onClick={handleSignUp}
            sx={{
              py: 1.5,
              "&:hover": {
                background: "rgba(236, 72, 153, 0.1)",
              },
            }}
          >
            <PersonAddIcon sx={{ mr: 2, color: "#EC4899" }} />
            <Typography sx={{ color: "#fff" }}>Sign Up</Typography>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <motion.div
      style={{
        position: "fixed",
        width: "100%",
        zIndex: 1000,
        backdropFilter: "blur(20px)",
        background: scrolled
          ? "rgba(17, 17, 17, 0.95)"
          : "rgba(17, 17, 17, 0.8)",
        boxShadow: scrolled ? "0 8px 32px rgba(0, 0, 0, 0.3)" : "none",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        transition: "all 0.3s ease",
      }}
    >
      <AppBar
        position="static"
        sx={{ background: "transparent", boxShadow: "none" }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              py: { xs: 1, sm: 2 },
            }}
          >
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 800,
                  letterSpacing: "2px",
                  background:
                    "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <span style={{ fontStyle: "italic" }}>Canvine</span>
              </Typography>
            </motion.div>

            {/* Search Bar */}
            <Box
              sx={{
                position: "relative",
                flexGrow: 1,
                maxWidth: { xs: "100%", sm: "300px", md: "400px" },
                mx: { xs: 0, sm: 2 },
              }}
              ref={searchRef}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search..."
                size="small"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "12px",
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.1)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.2)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(255,255,255,0.3)",
                    },
                  },
                  "& input": {
                    color: "#fff",
                    "&::placeholder": {
                      color: "rgba(255,255,255,0.5)",
                    },
                  },
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Paper
                      sx={{
                        position: "absolute",
                        top: "100%",
                        width: "100%",
                        background: "rgba(17, 17, 17, 0.95)",
                        backdropFilter: "blur(20px)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                        borderRadius: "12px",
                        padding: 2,
                        maxHeight: "400px",
                        overflowY: "auto",
                        mt: 1,
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <Grid container spacing={2}>
                        {filteredResults.map((media) => (
                          <Grid key={media.id} item xs={12}>
                            <MediaCard media={media} />
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {menuItems.map((item) => (
                  <Tooltip key={item.text} title={item.text} arrow>
                    <Button
                      component={Link}
                      to={item.path}
                      startIcon={item.icon}
                      sx={{
                        color: "#fff",
                        borderRadius: "8px",
                        px: 2,
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.1)",
                        },
                      }}
                    >
                      {!isSmallMobile && item.text}
                    </Button>
                  </Tooltip>
                ))}
              </Box>
            )}

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Tooltip title="Notifications" arrow>
                <IconButton
                  sx={{
                    color: "#fff",
                    "&:hover": { backgroundColor: "rgba(139, 92, 246, 0.1)" },
                  }}
                >
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              {!isLoggedIn ? (
                <>
                  <Button
                    variant="outlined"
                    onClick={handleLogin}
                    sx={{
                      color: "#fff",
                      borderColor: "rgba(139, 92, 246, 0.3)",
                      "&:hover": {
                        borderColor: "#8B5CF6",
                        backgroundColor: "rgba(139, 92, 246, 0.1)",
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSignUp}
                    sx={{
                      background:
                        "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                      color: "#fff",
                      fontWeight: "bold",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                        opacity: 0.9,
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      background:
                        "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                      color: "#fff",
                      fontWeight: "bold",
                      borderRadius: "12px",
                      px: 3,
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                        opacity: 0.9,
                      },
                    }}
                    onClick={() => navigate("/admin/upload")}
                  >
                    {!isSmallMobile && "Upload"}
                  </Button>
                </motion.div>
              )}

              <Tooltip title="Profile" arrow>
                <IconButton
                  onClick={handleProfileMenuOpen}
                  sx={{
                    color: "#fff",
                    "&:hover": { backgroundColor: "rgba(139, 92, 246, 0.1)" },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "#8B5CF6",
                      border: "2px solid rgba(139, 92, 246, 0.2)",
                    }}
                  >
                    <PersonIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>

              {/* Mobile Menu Button */}
              {isMobile && (
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setMobileMenuOpen(true)}
                  sx={{ color: "#fff" }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: "80%",
            maxWidth: "300px",
            background: "rgba(17, 17, 17, 0.95)",
            backdropFilter: "blur(20px)",
            borderLeft: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
            Menu
          </Typography>
        </Box>
        <List sx={{ pt: 2 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              sx={{
                color: "#fff",
                py: 1.5,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {renderMenu}
    </motion.div>
  );
};

export default Header;
