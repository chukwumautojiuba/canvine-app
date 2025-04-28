import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import hero from "../assets/images/images8.jpg";

const Hero = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "linear-gradient(180deg, #111111 0%, #1a1a1a 100%)",
        overflow: "hidden",
        pt: { xs: 8, sm: 10 },
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
            radial-gradient(circle at 25px 25px, rgba(139, 92, 246, 0.2) 2%, transparent 0%),
            radial-gradient(circle at 75px 75px, rgba(236, 72, 153, 0.2) 2%, transparent 0%)
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

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(180deg, rgba(17,17,17,0.7) 0%, rgba(17,17,17,0.3) 100%)",
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Image */}
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "100px",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(139, 92, 246, 0.2)",
                  transform: "rotate(-2deg)",
                  "&:hover": {
                    transform: "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  },
                }}
              >
                <Box
                  component="img"
                  src={hero}
                  alt="Hero"
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(45deg, rgba(139, 92, 246, 0.2), transparent)",
                    zIndex: 1,
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
          {/* Text Content */}
          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  color: "#111111",
                  mb: 3,
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                  lineHeight: 1.1,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                  background:
                    "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Your Creative Vision, Our Canvas
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "rgba(148, 131, 131, 0.9)",
                  mb: 4,
                  fontSize: { xs: "1.1rem", sm: "1.3rem" },
                  lineHeight: 1.6,
                  maxWidth: "600px",
                }}
              >
                Join our vibrant community of creators. Share your unique
                perspective, discover inspiring works, and let your imagination
                run wild in our creative sanctuary.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      background:
                        "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                      color: "#fff",
                      borderRadius: "30px",
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      boxShadow: "0 4px 14px rgba(139, 92, 246, 0.3)",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                        opacity: 0.9,
                      },
                    }}
                  >
                    Start Creating
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: "#8B5CF6",
                      color: "#fff",
                      borderRadius: "30px",
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      "&:hover": {
                        borderColor: "#EC4899",
                        backgroundColor: "rgba(139, 92, 246, 0.1)",
                      },
                    }}
                  >
                    Explore Gallery
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
