import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const CommentSection = ({ comments = [] }) => {
  return (
    <Box sx={{ marginTop: "16px", marginBottom: "50px" }}>
      <Typography variant="h6" sx={{ color: "#fff" }}>Comments:</Typography>

      {comments.map((comment, index) => (
        <Box
          key={index}
          sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}
        >
          <Avatar sx={{ marginRight: "8px" }}>
            {(comment.username || "U").charAt(0)}
          </Avatar>
          <Typography variant="body1" sx={{ color: "#fff" }}>{comment.text}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default CommentSection;

