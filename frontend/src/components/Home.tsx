import * as React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
      }}
      alignItems="center"
    >
      <Box
        sx={{ width: "100%", display: "flex", flexDirection: "column" }}
        alignItems="center"
      >
        <Box sx={{ width: "50%" }}>
          <Typography variant="h2" align="center">
            Hello, dear user
          </Typography>
          <Typography variant="h6">
            Welcome to Bofu. Here we all are just mere enjoyers of some
            good-quality music. Try to guess others' suggestions in "Feed"
            section or go ahead and ask others what's this melody you're stuck
            with and don't know the name of in "Ask". Our growing community is
            over 100M people now, so someone has to respond, right? Alright, I'm
            gonna leave you alone now. Do whatever you want. Make sure to be
            logged in though, if you wanna do something meaningful here.
          </Typography>
          <Typography variant="h3" align="right">
            -bbiff
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
