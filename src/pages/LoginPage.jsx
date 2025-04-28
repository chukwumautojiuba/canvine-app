import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import { login } from "../services/authService";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await login({ username, password });
      console.log("Login successful:", user);
      setError("");

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        const redirectTo =
          new URLSearchParams(location.search).get("redirect") || "/";
        navigate(redirectTo);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
        padding: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `
            radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2%, transparent 0%),
            radial-gradient(circle at 75px 75px, rgba(255,255,255,0.2) 2%, transparent 0%)
          `,
          backgroundSize: "100px 100px",
          animation: "backgroundMove 20s linear infinite",
          "@keyframes backgroundMove": {
            "0%": {
              backgroundPosition: "0 0",
            },
            "100%": {
              backgroundPosition: "100px 100px",
            },
          },
        }}
      />

      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={24}
            sx={{
              p: { xs: 3, sm: 4 },
              width: "100%",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              borderRadius: "24px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
                }}
              >
                <LockOutlinedIcon sx={{ color: "#000", fontSize: 30 }} />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  mb: 1,
                  fontSize: { xs: "1.8rem", sm: "2rem" },
                  textAlign: "center",
                }}
              >
                Welcome Back
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "rgba(255, 255, 255, 0.7)", textAlign: "center" }}
              >
                Sign in to continue to your account
              </Typography>
            </Box>

            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 2,
                  background: "rgba(211, 47, 47, 0.1)",
                  color: "#ff1744",
                  border: "1px solid rgba(211, 47, 47, 0.3)",
                  borderRadius: "12px",
                }}
              >
                {error}
              </Alert>
            )}

            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  borderRadius: "12px",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    borderRadius: "12px",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8B5CF6",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                  "&.Mui-focused": {
                    color: "#8B5CF6",
                  },
                },
              }}
            />

            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  borderRadius: "12px",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    borderRadius: "12px",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8B5CF6",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                  "&.Mui-focused": {
                    color: "#8B5CF6",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              sx={{
                py: 1.5,
                background: "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "1.1rem",
                fontWeight: "bold",
                color: "#fff",
                boxShadow: "0 4px 20px rgba(139, 92, 246, 0.3)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                  opacity: 0.9,
                },
              }}
            >
              Sign In
            </Button>

            <Box
              sx={{
                mt: 4,
                textAlign: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  marginTop: 2,
                }}
              >
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  style={{
                    color: "#8B5CF6",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LoginPage;
