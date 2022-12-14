import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dropzone from "react-dropzone";
import { useCallback } from "react";
import Box from "@mui/material/Box";
import RecordButton from "./RecordButton";
import Recording from "./Recording";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

type PostPrevProps = {
  audio_id: number;
  from_username: string;
};

const useStyles = makeStyles((theme) => ({
  postPreview: {
    border: "solid",
    borderColor: theme.palette.primary.main,
    borderRadius: "5px",
    padding: "20px",
    margin: "10px 0",
    textAlign: "center",
    width: "50%",
    height: "150px",
    display: "flex",
    flexDirection: "column",
  },
}));

export default function PostPreview(props: PostPrevProps) {
  console.log(
    "audio_id: " + props.audio_id + " from_username: " + props.from_username
  );

  const classes = useStyles();
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
        <Box className={classes.postPreview} alignItems="center">
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
