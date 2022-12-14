import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dropzone from "react-dropzone";
import { useCallback } from "react";
import Box from "@mui/material/Box";
import RecordButton from "./RecordButton";
import AuthService from "../services/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  dropzone: {
    border: "dashed",
    borderColor: theme.palette.primary.main,
    borderRadius: "5px",
    padding: "20px",
    margin: "10px 0",
    textAlign: "center",
    width: "50%",
    right: "0",
    height: "100%",
    backgroundColor: "blue",
    display: "flex",
    alignItems: "center",
  },
  miczone: {
    width: "50%",
    left: "0",
    height: "100%",
    backgroundColor: "red",
    display: "flex",
    alignItems: "center",
    borderRadius: "5px",
  },
  commonGrid: {
    height: "100%",
  },
}));

function MicZone() {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.miczone}
      direction="row"
      alignItems="center"
    >
      <Box
        alignItems="center"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          alignItems="center"
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Typography variant="h2" color="inherit" align="center" noWrap>
            Record here
          </Typography>
        </Box>
        <Box
          alignItems="center"
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <RecordButton />
        </Box>
      </Box>
    </Grid>
  );
}

function DropZone() {
  const classes = useStyles();
  const handleDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);
  return (
    <Dropzone onDrop={handleDrop}>
      {({ getRootProps, getInputProps }) => (
        <Grid
          container
          {...getRootProps()}
          className={classes.dropzone}
          direction="row"
          alignItems="center"
        >
          <input {...getInputProps()} />
          <Box
            alignItems="center"
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Typography variant="h6">
              Or drag and drop your files here or click to select them
            </Typography>
          </Box>
        </Grid>
      )}
    </Dropzone>
  );
}

export default function FileUpload() {
  let navigate: NavigateFunction = useNavigate();
  const classes = useStyles();
  React.useEffect(() => {
    if (!AuthService.isSignedIn()) {
      console.log("Not signed in");
      navigate("/login");
      window.location.reload();
    }
  }, []);

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      className={classes.commonGrid}
    >
      <MicZone />
      <DropZone />
    </Grid>
  );
}
