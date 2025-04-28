import { Card, Typography, IconButton, Box, Chip, Rating } from "@mui/material";
import PropTypes from "prop-types";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Link } from "react-router-dom";
import Image1 from "../assets/images/images.jpeg";
import Image2 from "../assets/images/images1.jpg";
import Image3 from "../assets/images/images2.jpeg";
import { motion } from "framer-motion";

const defaultThumbnails = {
  video: [Image1, Image2, Image3],
  movie: [Image1, Image2, Image3],
  image: [Image1, Image2, Image3],
};

const getRandomThumbnail = (type) => {
  const images = defaultThumbnails[type] || defaultThumbnails.image;
  return images[Math.floor(Math.random() * images.length)];
};

const MediaCard = ({ media }) => {
  const isVideoOrMovie =
    media.category === "videos" || media.category === "movies";
  const thumbnail = isVideoOrMovie
    ? getRandomThumbnail(media.category)
    : media.url || getRandomThumbnail(media.category || "image");

  return (
    <Link
      to={`/media/${media.id}`}
      style={{
        textDecoration: "none",
        display: "block",
        height: "100%",
      }}
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ height: "100%" }}
      >
        <Card
          sx={{
            borderRadius: "20px",
            overflow: "hidden",
            height: "100%",
            minHeight: 320,
            display: "flex",
            flexDirection: "column",
            background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(${thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            position: "relative",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
              "& .overlay": {
                opacity: 1,
              },
              "& .play-button": {
                transform: "scale(1.1)",
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
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)",
              zIndex: 1,
            },
          }}
        >
          {/* Overlay with play button for video/movie */}
          {isVideoOrMovie && (
            <Box
              className="overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.4)",
                opacity: 0,
                transition: "opacity 0.3s ease",
                zIndex: 2,
              }}
            >
              <IconButton
                className="play-button"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  color: "white",
                  padding: "20px",
                  borderRadius: "50%",
                  transition: "all 0.3s ease",
                  opacity: 0.8,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                <PlayArrowIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Box>
          )}

          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              p: 3,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Chip
                label={media.category || "image"}
                size="small"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  backdropFilter: "blur(10px)",
                  mb: 2,
                  px: 1,
                  "& .MuiChip-label": {
                    textTransform: "capitalize",
                    fontWeight: 600,
                  },
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#fff",
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  mb: 2,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineHeight: 1.3,
                }}
              >
                {media.title || "Untitled"}
              </Typography>
            </Box>

            <Box>
              <Rating
                value={media.averageRating || 0}
                precision={0.5}
                readOnly
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "#ffd700",
                  },
                  "& .MuiRating-iconEmpty": {
                    color: "rgba(255,255,255,0.3)",
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  mt: 1,
                  fontSize: "0.9rem",
                }}
              >
                {media.averageRating || 0} out of 5
              </Typography>
            </Box>
          </Box>
        </Card>
      </motion.div>
    </Link>
  );
};

MediaCard.propTypes = {
  media: PropTypes.shape({
    category: PropTypes.string.isRequired,
    title: PropTypes.string,
    averageRating: PropTypes.number,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    url: PropTypes.string,
  }).isRequired,
};

export default MediaCard;
