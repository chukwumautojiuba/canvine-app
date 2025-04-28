import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Skeleton,
  Tabs,
  Tab,
  Paper,
  Grid,
  Chip,
  Divider,
  Button,
  Container,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import CommentSection from "../components/CommentSection";
import Rating from "../components/Rating";
import { fetchMedia, submitComment } from "../services/api";
import banner from "../assets/images/images3.jpg";

const MediaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [media, setMedia] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const loadMedia = async () => {
      setLoading(true);
      try {
        const fetchedMedia = await fetchMedia(id);
        setMedia(fetchedMedia);
        setComments(fetchedMedia.comments || []);
      } catch (error) {
        console.error("Failed to load media", error);
      } finally {
        setLoading(false);
      }
    };
    loadMedia();
  }, [id]);

  const handleAddComment = async () => {
    if (!comment.trim()) return;
    const username = localStorage.getItem("username") || "Guest";
    setComments([
      ...comments,
      { username, text: comment, timestamp: new Date().toISOString() },
    ]);
    setComment("");
    await submitComment({ uploadId: id, comment });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "images":
        return "#8B5CF6";
      case "videos":
        return "#8B5CF6";
      case "movies":
        return "#8B5CF6";
      default:
        return "#8B5CF6";
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: media?.title || "Check out this media",
          text: media?.description || "Check out this amazing media content!",
          url: window.location.href,
        });
        setSnackbar({
          open: true,
          message: "Shared successfully!",
          severity: "success",
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setSnackbar({
          open: true,
          message: "Link copied to clipboard!",
          severity: "success",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      setSnackbar({
        open: true,
        message: "Failed to share. Please try again.",
        severity: "error",
      });
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(media?.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = media?.title || "download";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setSnackbar({
        open: true,
        message: "Download started!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error downloading:", error);
      setSnackbar({
        open: true,
        message: "Failed to download. Please try again.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#000" }}>
      {/* Back Button */}
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: "fixed",
          top: 20,
          left: 20,
          zIndex: 10,
          bgcolor: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "50%",
          p: 1,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.2)",
          },
        }}
      >
        <ArrowBackIcon sx={{ color: "#fff" }} />
      </IconButton>

      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: "40vh", sm: "50vh", md: "60vh" },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${
                media?.category === "images" ? media.url : banner
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.9) 100%)",
              },
            }}
          />
        )}
      </Box>

      <Container maxWidth="lg" sx={{ mt: -8, position: "relative", zIndex: 2 }}>
        <Paper
          elevation={4}
          sx={{
            borderRadius: "24px",
            overflow: "hidden",
            mb: 4,
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Grid container spacing={3}>
              {/* Media Content */}
              <Grid item xs={12} md={8}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={400} />
                ) : (
                  <Box
                    sx={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                      bgcolor: "#000",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: 400,
                    }}
                  >
                    {media?.category === "videos" ||
                    media?.category === "movies" ? (
                      <Box
                        component="video"
                        controls
                        src={media?.url}
                        sx={{
                          width: "100%",
                          maxHeight: 600,
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <Box
                        component="img"
                        src={media?.url}
                        alt={media?.title}
                        sx={{
                          width: "100%",
                          maxHeight: 600,
                          objectFit: "contain",
                        }}
                      />
                    )}
                  </Box>
                )}
              </Grid>

              {/* Media Info */}
              <Grid item xs={12} md={4}>
                <Box sx={{ height: "100%" }}>
                  {loading ? (
                    <>
                      <Skeleton variant="text" width="80%" height={40} />
                      <Skeleton variant="text" width="60%" height={30} />
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={100}
                        sx={{ mt: 2 }}
                      />
                    </>
                  ) : (
                    <>
                      <Box sx={{ mb: 3 }}>
                        <Chip
                          label={media?.category || "Unknown"}
                          size="small"
                          sx={{
                            bgcolor: getCategoryColor(media?.category),
                            color: "#000",
                            mb: 1,
                            fontWeight: 600,
                          }}
                        />
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: "bold",
                            mb: 1,
                            color: "#fff",
                            fontSize: { xs: "1.5rem", sm: "2rem" },
                          }}
                        >
                          {media?.title || "Untitled"}
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <Rating
                            mediaId={media?.id}
                            initialRating={media?.rating}
                          />
                          <Typography
                            variant="body2"
                            sx={{ ml: 1, color: "rgba(255,255,255,0.7)" }}
                          >
                            ({media?.rating || 0} rating)
                          </Typography>
                        </Box>
                      </Box>

                      <Divider
                        sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }}
                      />

                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold", mb: 1, color: "#fff" }}
                        >
                          Description
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "rgba(255,255,255,0.7)" }}
                        >
                          {media?.description || "No description available."}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                        <Button
                          variant="contained"
                          startIcon={<FavoriteIcon />}
                          sx={{
                            borderRadius: "30px",
                            flex: 1,
                            background:
                              "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                            color: "#fff",
                            "&:hover": {
                              background:
                                "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                              opacity: 0.9,
                            },
                          }}
                        >
                          Like
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<ShareIcon />}
                          onClick={handleShare}
                          sx={{
                            borderRadius: "30px",
                            flex: 1,
                            borderColor: "rgba(255,255,255,0.2)",
                            color: "#fff",
                            "&:hover": {
                              borderColor: "#fff",
                              bgcolor: "rgba(255,255,255,0.1)",
                            },
                          }}
                        >
                          Share
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<DownloadIcon />}
                          onClick={handleDownload}
                          sx={{
                            borderRadius: "30px",
                            flex: 1,
                            borderColor: "rgba(255,255,255,0.2)",
                            color: "#fff",
                            "&:hover": {
                              borderColor: "#fff",
                              bgcolor: "rgba(255,255,255,0.1)",
                            },
                          }}
                        >
                          Download
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: "rgba(255,255,255,0.1)" }}>
            <Tabs
              value={tab}
              onChange={(_, newValue) => setTab(newValue)}
              centered
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "#8B5CF6",
                  height: 3,
                },
              }}
            >
              <Tab
                label="Details"
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  "&.Mui-selected": {
                    color: "#8B5CF6",
                    fontWeight: "bold",
                  },
                }}
              />
              <Tab
                label="Comments"
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  "&.Mui-selected": {
                    color: "#8B5CF6",
                    fontWeight: "bold",
                  },
                }}
              />
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            {tab === 0 ? (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: "16px",
                      bgcolor: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 1, color: "#fff" }}
                    >
                      Uploaded By
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ mr: 2, bgcolor: "#8B5CF6" }}>
                        {media?.uploader?.charAt(0) || "U"}
                      </Avatar>
                      <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                        {media?.uploader || "Unknown User"}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: "16px",
                      bgcolor: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 1, color: "#fff" }}
                    >
                      Upload Date
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                      {media?.uploadDate
                        ? new Date(media.uploadDate).toLocaleDateString()
                        : "Unknown Date"}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: "16px",
                      bgcolor: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 1, color: "#fff" }}
                    >
                      Tags
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {media?.tags?.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          sx={{
                            bgcolor: "rgba(139, 92, 246, 0.1)",
                            color: "#8B5CF6",
                            border: "1px solid rgba(139, 92, 246, 0.2)",
                          }}
                        />
                      )) || (
                        <Typography
                          variant="body2"
                          sx={{ color: "rgba(255,255,255,0.5)" }}
                        >
                          No tags available
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            ) : (
              <Box>
                <CommentSection comments={comments} />
                <Box
                  sx={{
                    mt: 5,
                    p: 2,
                    borderRadius: "16px",
                    bgcolor: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(200, 142, 241, 0.1)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ mr: 2, bgcolor: "#8B5CF6" }}>
                    {media?.title?.charAt(0).toUpperCase()}
                  </Avatar>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    sx={{
                      mr: 2,
                      "& .MuiOutlinedInput-root": {
                        color: "#fff",
                        "& fieldset": {
                          borderColor: "rgba(255,255,255,0.2)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.3)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#8B5CF6",
                        },
                      },
                      "& input::placeholder": {
                        color: "rgba(255,255,255,0.5)",
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleAddComment}
                    disabled={!comment.trim()}
                    sx={{
                      background:
                        "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                      color: "#fff",
                      borderRadius: "30px",
                      px: 3,
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                        opacity: 0.9,
                      },
                      "&.Mui-disabled": {
                        background: "rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.3)",
                      },
                    }}
                  >
                    Post
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            bgcolor: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            color: "#fff",
            "& .MuiAlert-icon": {
              color: "#8B5CF6",
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MediaDetails;
