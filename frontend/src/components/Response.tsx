import * as React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";


type ResponseProps = {
  username: string;
  text: string;
};

export default function Response(props: ResponseProps) {
  return (
    <Box sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        m: "20px",
      }}
      alignItems="left"
    >
      <Box sx={{
        border: "solid",
        borderColor: "cyan",
        borderRadius: "5px",
        padding: "20px",
        width: "50%"
      }}
    >
        <Box sx={{ width: "100%", borderBottom: 1 }}>
          <Typography variant="h4" align="left">
            from: {props.username}
          </Typography>
        </Box>
        <Typography variant="h5">{props.text}</Typography>
      </Box>
    </Box>
  );
}
