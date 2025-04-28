import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  CircularProgress,
  IconButton,
  LinearProgress,
  Container,
  Paper,
  Fade,
} from "@mui/material";
import { CloudUpload, Delete, Image } from "@mui/icons-material";
import { uploadMedia } from "../../services/api";
import { motion } from "framer-motion";

const categories = ["Images"];

const UploadMediaPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    if (!title || !category || !file) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setProgress(10);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category.toLowerCase());
    formData.append("file", file);

    try {
      const response = await uploadMedia(formData);
      console.log("Upload Success:", response.data);
      setSuccess("Media uploaded successfully!");
      setError("");
      setTitle("");
      setCategory("");
      setFile(null);
      setPreview(null);
      setProgress(0);
    } catch (error) {
      setError("Error uploading media");
      console.error("Upload Error:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected File:", selectedFile);

    if (selectedFile) {
      const isValid = selectedFile.type.startsWith("image/");
      if (!isValid) {
        setError("Invalid file type. Please upload an image.");
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError("");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #000000 0%, #1a1a1a 100%)",
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
      <Container maxWidth="md" sx={{ py: 8, position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={24}
            sx={{
              p: 4,
              background: "rgba(17, 17, 17, 0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: "24px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
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
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)",
                zIndex: 0,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 4,
                position: "relative",
                zIndex: 1,
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
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
                      background:
                        "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                      zIndex: -1,
                      filter: "blur(10px)",
                      opacity: 0.5,
                    },
                  }}
                >
                  <Image sx={{ fontSize: 40, color: "#fff" }} />
                </Box>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    background:
                      "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1,
                    textShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
                    letterSpacing: "1px",
                  }}
                >
                  Upload Media
                </Typography>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    textAlign: "center",
                  }}
                >
                  Upload your images to share with the community
                </Typography>
              </motion.div>
            </Box>

            <Box sx={{ mb: 4, position: "relative", zIndex: 1 }}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.05)",
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.1)",
                    },
                    "&.Mui-focused": {
                      background: "rgba(255, 255, 255, 0.1)",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#8B5CF6",
                      },
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#fff",
                  },
                }}
              />

              <TextField
                select
                label="Category"
                variant="outlined"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.05)",
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.1)",
                    },
                    "&.Mui-focused": {
                      background: "rgba(255, 255, 255, 0.1)",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#8B5CF6",
                      },
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#fff",
                  },
                }}
              >
                {categories.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <Box
                sx={{
                  border: "2px dashed rgba(139, 92, 246, 0.3)",
                  borderRadius: "16px",
                  p: 4,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  background: "rgba(139, 92, 246, 0.05)",
                  "&:hover": {
                    background: "rgba(139, 92, 246, 0.1)",
                    borderColor: "#8B5CF6",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  hidden
                  id="upload-input"
                />
                <label htmlFor="upload-input">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <CloudUpload
                      sx={{
                        fontSize: 48,
                        color: "#8B5CF6",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#fff",
                        fontWeight: 500,
                      }}
                    >
                      Drag & Drop or Click to Upload
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      Supported formats: JPG, PNG, GIF
                    </Typography>
                  </Box>
                </label>
              </Box>
            </Box>

            {preview && (
              <Fade in={true}>
                <Box
                  sx={{
                    position: "relative",
                    mb: 4,
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(139, 92, 246, 0.2)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                  }}
                >
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      maxHeight: 300,
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    onClick={handleRemoveFile}
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      background: "rgba(0, 0, 0, 0.6)",
                      backdropFilter: "blur(4px)",
                      "&:hover": {
                        background: "rgba(0, 0, 0, 0.8)",
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <Delete sx={{ color: "#fff" }} />
                  </IconButton>
                </Box>
              </Fade>
            )}

            {loading && (
              <Box
                sx={{ width: "100%", mb: 3, position: "relative", zIndex: 1 }}
              >
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    background: "rgba(255, 255, 255, 0.1)",
                    "& .MuiLinearProgress-bar": {
                      background:
                        "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    mt: 1,
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  Uploading... {progress}%
                </Typography>
              </Box>
            )}

            <Button
              variant="contained"
              fullWidth
              onClick={handleUpload}
              disabled={loading}
              sx={{
                height: 56,
                borderRadius: "12px",
                background: "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1.1rem",
                textTransform: "none",
                boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
                position: "relative",
                zIndex: 1,
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(139, 92, 246, 0.4)",
                },
                "&:disabled": {
                  background: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Upload Image"
              )}
            </Button>

            {error && (
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  mt: 2,
                  color: "#ff4d4d",
                  background: "rgba(255, 77, 77, 0.1)",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {error}
              </Typography>
            )}

            {success && (
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  mt: 2,
                  color: "#8B5CF6",
                  background: "rgba(139, 92, 246, 0.1)",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {success}
              </Typography>
            )}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default UploadMediaPage;
