import React from "react";
import {
  Box,
  Stack,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const { Meta } = Card;

const CourseCard = ({
  loading,
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
}) => {
  return (
    <Stack>
      <Card
        sx={{
          width: "250px",
          objectFit: "contain",
          borderRadius: "8px",
          transition: "all 0.5s",
          ":hover": {
            transform: "translateY(-10px)",
          },
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            image={imageSrc}
            alt="green iguana"
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", sm: "flex-start" },
            }}
          >
            <Typography sx={{ fontWeight: 700, marginTop: "0px" }} variant="h6">
              {title}
            </Typography>
            <Typography variant="subtitle2">{description}</Typography>

            <Box sx={{ display: "flex", marginTop: "8px" }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                Creator:
              </Typography>
              <Typography variant="subtitle2" ml={1}>
                {creator}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", marginTop: "8px" }}>
              <Typography
                sx={{ fontWeight: 700, textTransform: "uppercase" }}
                variant="subtitle2"
              >
                Lecture:
              </Typography>
              <Typography variant="subtitle2" ml={1} sx={{ marginTop: "1px" }}>
                {lectureCount}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", marginTop: "8px" }}>
              <Typography
                sx={{ fontWeight: 700, textTransform: "uppercase" }}
                variant="subtitle2"
              >
                Views:
              </Typography>
              <Typography variant="subtitle2" ml={1} sx={{ marginTop: "1px" }}>
                {views}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "row" },
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "13px",
          }}
        >
          <Link to={`/course/${id}`} style={{ textDecoration: "none" }}>
            <Button
              type="primary"
              style={{
                textTransform: "none",
                fontSize: "13px",
                backgroundColor: "#FFEA20",
                color: "black",
                ":hover": {
                  backgroundColor: "#FFE600",
                },
                marginRight: "8px",
              }}
              size="medium"
            >
              Watch Now
            </Button>
          </Link>

          <Button
            type="primary"
            style={{
              textTransform: "none",
              fontSize: "13px",
              backgroundColor: "#FFEA20",
              color: "black",
              ":hover": {
                backgroundColor: "#FFE600",
              },
            }}
            size="medium"
            onClick={() => addToPlaylistHandler(id)}
            disabled={loading}
          >
            Add To Playlist
          </Button>

        </Box>
      </Card>
    </Stack>
  );
};

export default CourseCard;
