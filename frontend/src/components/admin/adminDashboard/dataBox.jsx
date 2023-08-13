import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";

const DataBox = ({ title, qty, qtyPercentage, profit }) => {
  return (
    <Box
      sx={{
        width: { xs: "85%", sm: "20%" },
        boxShadow: "-2px 0 10px rgba(0, 0, 0, 0.4)",
        p: 3,
        borderRadius: "5%",
      }}
    >
      <Typography variant="body2">{title}</Typography>

      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
          {qty}
        </Typography>
        <Stack direction="row">
          <Typography sx={{marginTop:"3px"}}>{`${qtyPercentage}%`}</Typography>
          {profit ? (
            <RiArrowUpLine color="green" style={{marginTop:"5px", marginLeft:"5px"}} />
          ) : (
            <RiArrowDownLine color="red" style={{marginTop:"5px", marginLeft:"5px"}} />
          )}
        </Stack>
      </Stack>
      <Typography mt={1} variant="body2" sx={{opacity:"0.6"}}>Since Last Month</Typography>
    </Box>
  );
};

export default DataBox;
