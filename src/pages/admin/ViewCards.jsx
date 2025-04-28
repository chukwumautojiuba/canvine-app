import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { fetchMedias } from "../../services/api";
import { Box, IconButton, Tooltip, Chip, Button } from "@mui/material";
import { motion } from "framer-motion";
import {
  VideoLibrary,
  Image as ImageIcon,
  Movie,
  TrendingUp,
  ArrowForward,
  Add,
  Visibility,
  Download,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const categoryStyles = {
  videos: {
    gradient: "linear-gradient(135deg, #8B5CF6, #EC4899)",
    icon: <VideoLibrary sx={{ fontSize: 40 }} />,
    accent: "#8B5CF6",
    bgColor: "rgba(139, 92, 246, 0.1)",
    borderColor: "rgba(139, 92, 246, 0.3)",
  },
  images: {
    gradient: "linear-gradient(135deg, #8B5CF6, #EC4899)",
    icon: <ImageIcon sx={{ fontSize: 40 }} />,
    accent: "#EC4899",
    bgColor: "rgba(236, 72, 153, 0.1)",
    borderColor: "rgba(236, 72, 153, 0.3)",
  },
  movies: {
    gradient: "linear-gradient(135deg, #8B5CF6, #EC4899)",
    icon: <Movie sx={{ fontSize: 40 }} />,
    accent: "#8B5CF6",
    bgColor: "rgba(139, 92, 246, 0.1)",
    borderColor: "rgba(139, 92, 246, 0.3)",
  },
};

const ViewCards = () => {
  const categories = ["videos", "images", "movies"];
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMedias = async () => {
      try {
        const medias = await fetchMedias();
        const counts = categories.map((category) => ({
          category,
          count: medias.filter((media) => media.category === category).length,
        }));
        setCategoryCounts(counts);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    loadMedias();
  }, []);

  return (
    <Box
      sx={{
        padding: 4,
        background: "linear-gradient(180deg, #000000 0%, #1a1a1a 100%)",
        minHeight: "100vh",
        position: "relative",
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
      <Box sx={{ maxWidth: 1200, mx: "auto", position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 6,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
              letterSpacing: "1px",
            }}
          >
            Media Dashboard
          </Typography>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate("/admin/upload")}
            sx={{
              background: "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "12px",
              px: 3,
              py: 1,
              boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
              "&:hover": {
                background: "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(139, 92, 246, 0.4)",
              },
            }}
          >
            Upload New
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category.charAt(0).toUpperCase() + category.slice(1)}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category ? null : category
                )
              }
              sx={{
                background:
                  selectedCategory === category
                    ? categoryStyles[category].bgColor
                    : "rgba(255, 255, 255, 0.1)",
                color: "white",
                border: `1px solid ${
                  selectedCategory === category
                    ? categoryStyles[category].borderColor
                    : "rgba(255, 255, 255, 0.2)"
                }`,
                borderRadius: "8px",
                px: 1,
                py: 2,
                fontSize: "0.9rem",
                fontWeight: 500,
                transition: "all 0.3s ease",
                "&:hover": {
                  background: categoryStyles[category].bgColor,
                  borderColor: categoryStyles[category].borderColor,
                  transform: "translateY(-2px)",
                },
              }}
            />
          ))}
        </Box>

        <Grid container spacing={4}>
          {categoryCounts.map(({ category, count }, index) => (
            <Grid item xs={12} sm={6} md={4} key={category}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    borderRadius: "24px",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${categoryStyles[category].borderColor}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: `0 20px 40px rgba(139, 92, 246, 0.2)`,
                      borderColor: categoryStyles[category].accent,
                      "& .card-content": {
                        transform: "translateY(0)",
                        opacity: 1,
                      },
                      "& .card-icon": {
                        transform: "scale(1.1) rotate(5deg)",
                        color: categoryStyles[category].accent,
                      },
                      "&::after": {
                        opacity: 0.1,
                      },
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: categoryStyles[category].gradient,
                      opacity: 0.05,
                      transition: "opacity 0.3s ease",
                      zIndex: 0,
                    },
                  }}
                >
                  <CardContent
                    className="card-content"
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      p: 4,
                      transform: "translateY(20px)",
                      opacity: 0.8,
                      transition: "all 0.3s ease",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box
                        className="card-icon"
                        sx={{
                          color: "white",
                          transition: "all 0.3s ease",
                          p: 1.5,
                          borderRadius: "16px",
                          background: categoryStyles[category].bgColor,
                          border: `1px solid ${categoryStyles[category].borderColor}`,
                          boxShadow: `0 0 15px ${categoryStyles[category].accent}40`,
                          position: "relative",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            top: -5,
                            left: -5,
                            right: -5,
                            bottom: -5,
                            borderRadius: "16px",
                            background: categoryStyles[category].gradient,
                            zIndex: -1,
                            filter: "blur(10px)",
                            opacity: 0.3,
                          },
                        }}
                      >
                        {categoryStyles[category].icon}
                      </Box>

                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Tooltip title="View Details">
                          <IconButton
                            sx={{
                              color: "white",
                              background: "rgba(255, 255, 255, 0.1)",
                              backdropFilter: "blur(5px)",
                              "&:hover": {
                                background: "rgba(139, 92, 246, 0.2)",
                                transform: "translateY(-2px)",
                              },
                            }}
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download Report">
                          <IconButton
                            sx={{
                              color: "white",
                              background: "rgba(255, 255, 255, 0.1)",
                              backdropFilter: "blur(5px)",
                              "&:hover": {
                                background: "rgba(236, 72, 153, 0.2)",
                                transform: "translateY(-2px)",
                              },
                            }}
                          >
                            <Download />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "white",
                          fontWeight: 500,
                          mb: 1,
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        {category}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "baseline", gap: 1 }}
                      >
                        <Typography
                          variant="h3"
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                            background: categoryStyles[category].gradient,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textShadow: `0 0 20px ${categoryStyles[category].accent}40`,
                          }}
                        >
                          {count}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255, 255, 255, 0.7)",
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <TrendingUp sx={{ fontSize: 16 }} />
                          Total Items
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      variant="outlined"
                      endIcon={<ArrowForward />}
                      sx={{
                        mt: 3,
                        color: "white",
                        borderColor: categoryStyles[category].borderColor,
                        borderRadius: "12px",
                        py: 1,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: categoryStyles[category].accent,
                          background: categoryStyles[category].bgColor,
                          transform: "translateX(5px)",
                          boxShadow: `0 0 15px ${categoryStyles[category].accent}40`,
                        },
                      }}
                    >
                      Manage {category}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ViewCards;
