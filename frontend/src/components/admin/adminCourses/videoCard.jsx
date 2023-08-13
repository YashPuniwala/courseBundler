import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const VideoCard = ({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteLectureButtonHandler,
  addLectureHandler,
  loading,
}) => {
  return (
    <Stack
      mt={5}
      direction={{
        xs: "column",
        sm: "row",
      }}
      justifyContent={{ xs: "flex-start", sm: "space-between" }}
      sx={{
        boxShadow: "-2px 0 10px rgba(0, 0, 0, 0.4)",
        borderRadius: "5%",
        p: { xs: 2, sm: 5 },
        marginRight: { xs: "0px", sm: "60px" },
      }}
    >
      <Box>
        <Typography sx={{ fontSize: "15px" }}>{`#${num} ${title}`}</Typography>
        <Typography>{description}</Typography>
      </Box>

      <Link
        to={`/admin/editCourseLecturePage?courseId=${courseId}&lectureId=${lectureId}`}
      >
        <IconButton>
          <EditIcon sx={{ color: "white" }} />
        </IconButton>
      </Link>

      <IconButton
        onClick={() => deleteLectureButtonHandler(courseId, lectureId)}
        disabled={loading}
      >
        <DeleteIcon sx={{ color: "white" }} />
      </IconButton>
    </Stack>
  );
};

export default VideoCard;
