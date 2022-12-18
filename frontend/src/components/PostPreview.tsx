import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Recording from "./Recording";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

type PostPrevProps = {
  audio_id: number;
  from_username: string;
};

export default function PostPreview(props: PostPrevProps) {
  console.log(
    "audio_id: " + props.audio_id + " from_username: " + props.from_username
  );

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      alignContent="center"
    >
      <Grid container direction="column" alignItems="center">
        <Box sx={{
          border: "solid",
          borderColor: "cyan",
          borderRadius: "5px",
          padding: "20px",
          margin: "10px 0",
          textAlign: "center",
          width: "50%",
          display: "flex",
          flexDirection: "column"
        }} alignItems="center">
          <Typography variant="h5" gutterBottom>
            {"Author: " + props.from_username}
          </Typography>
          <Recording audio_id={props.audio_id} />
          <Button variant="contained" color="primary" sx={{ right: "0" }}>
            <Link to={"/" + props.audio_id}>View Post</Link>
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}
