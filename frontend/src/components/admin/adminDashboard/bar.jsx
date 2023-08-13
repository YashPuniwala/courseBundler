import React from "react";
import { Progress, Tooltip } from "antd";
import { Box, Stack, Typography } from "@mui/material";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#ed6c02" : "#308fe8",
  },
  [`& .${linearProgressClasses.colorSecondary}`]: {
    backgroundColor: "#ed6c02",
  },
}));

const Bar = ({ title, value, profit }) => {
  return (
    <Box sx={{ py: 2, px: { xs: 3, sm: 8 } }}>
      <Typography>{title}</Typography>
      <Stack
        direction="row"
        alignItems="center"
        sx={{ width: { xs: "15rem", sm: "40rem" } }}
      >
        <Typography sx={{ marginRight: "10px", marginTop: "20px" }}>
          {profit ? "0%" : `-${value}%`}
        </Typography>
        {/* <Progress width="100%" percentage={value} status="active"/> */}

        {value != null ? (
          <Tooltip title={profit ? value : `-${value}%`}>
            <Box sx={{ flexGrow: 1 }}>
              <br />
              <BorderLinearProgress variant="determinate" value={value} />
            </Box>
          </Tooltip>
        ) : null}

        <Typography sx={{ marginLeft: "7px", marginTop: "20px" }}>{`${
          value > 100 ? value : 100
        }%`}</Typography>
      </Stack>
    </Box>
  );
};

export default Bar;
