import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Dropzone from "react-dropzone";
import { useCallback } from "react";
import Box from "@mui/material/Box";
import RecordButton from "./RecordButton";
import AuthService from "../services/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";

function MicZone() {
  return (
    <Grid
      container
      sx={{width: "50%",
      left: "0",
      height: "100%",
      backgroundColor: "red",
      display: "flex",
      alignItems: "center",
      borderRadius: "5px"}}
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
  let navigate: NavigateFunction = useNavigate();
  const upload = (file: File) => {
    let formData = new FormData();
    formData.append("file", file);
    fetch(AuthService.API_URL + "api/recordings/upload", {
      method: "POST",
      headers: AuthService.authHeader(),
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        navigate(`/${data}`);
        window.location.reload();
      });
  };
  const handleDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: File) => {
      upload(file);
    });
  }, []);
  return (
    <Dropzone onDrop={handleDrop}>
      {({ getRootProps, getInputProps }) => (
        <Grid
          container
          {...getRootProps()}
          sx={{
            border: "dashed",
            borderColor: "black",
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
          }}
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
      sx={{height: "100%"}}
    >
      <MicZone />
      <DropZone />
    </Grid>
  );
}
