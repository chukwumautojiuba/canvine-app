import {
  Box,
  Typography,
  Link,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";

const Footer = () => {
 

  return (
    <Box
      component="footer"
      sx={{
        background:
          "linear-gradient(180deg, rgba(17,17,17,0.95) 0%, rgba(26,26,26,0.95) 100%)",
        backdropFilter: "blur(10px)",
        color: "#fff",
        padding: { xs: "40px 0", md: "60px 0" },
        marginTop: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))",
          opacity: 0.5,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: { xs: 3, md: 0 } }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  background:
                    "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Canvine
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  mb: 3,
                  lineHeight: 1.6,
                }}
              >
                Your creative vision, our canvas. Join our community of artists
                and creators to share, inspire, and explore amazing artwork.
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                {[
                  { icon: <Facebook />, link: "https://facebook.com" },
                  { icon: <Twitter />, link: "https://twitter.com" },
                  { icon: <Instagram />, link: "https://instagram.com" },
                  { icon: <YouTube />, link: "https://youtube.com" },
                ].map((social, index) => (
                  <IconButton
                    key={index}
                    href={social.link}
                    target="_blank"
                    sx={{
                      color: "#fff",
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                fontWeight: 600,
                mb: 2,
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {["Home", "Gallery", "About", "Contact"].map((link) => (
                <Link
                  key={link}
                  href="#"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#fff",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  {link}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Resources */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                fontWeight: 600,
                mb: 2,
              }}
            >
              Resources
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {["Blog", "Help Center", "Terms", "Privacy"].map((link) => (
                <Link
                  key={link}
                  href="#"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#fff",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  {link}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                fontWeight: 600,
                mb: 2,
              }}
            >
              Stay Updated
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: 2,
              }}
            >
              Subscribe to our newsletter for the latest updates and creative
              inspiration.
            </Typography>
            <Box
              component="form"
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#fff",
                  flex: 1,
                  outline: "none",
                }}
              />
              <button
                style={{
                  padding: "12px 24px",
                  borderRadius: "12px",
                  border: "none",
                  background:
                    "linear-gradient(45deg, #8B5CF6 30%, #EC4899 90%)",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Subscribe
              </button>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.7)",
            }}
          >
            © {new Date().getFullYear()} Canvine. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
