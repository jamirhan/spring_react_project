import * as React from "react";
import { useParams } from "react-router-dom";
import Recording from "./Recording";
import Response from "./Response";
import AuthService from "../services/auth";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";

const send_response = (post_id: number, text: string) => {
  let jsontext = JSON.stringify({
    text: text,
    postId: post_id,
  });
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  console.log("jsontext: " + jsontext);

  fetch(AuthService.API_URL + "api/responses/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.accessToken,
    },
    body: jsontext,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};

type ReponseFormProps = {
  id: number;
};

function ResponseForm(props: ReponseFormProps) {
  const [response, setResponse] = React.useState("");
  return (
    <Box
      sx={{
        height: "50%",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      alignContent="center"
    >
      <Box
        sx={{
          width: "100%",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
        alignContent="center"
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          alignContent="center"
        >
          <Box
            sx={{
              width: "50%",
              alignItems: "left",
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              alignContent: "left",
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }}>
              Your answer:
            </Typography>
          </Box>
          <TextField
            sx={{
              width: "50%",
              border: "solid",
              borderColor: "primary.main",
              borderRadius: "5px",
            }}
            multiline
            rows={3}
            inputProps={{ style: { color: "white" } }}
            onChange={(e) => setResponse(e.target.value)}
            value={response}
          ></TextField>
          <Button
            variant="outlined"
            sx={{ margin: "10px 0" }}
            size="large"
            onClick={() => {
              send_response(props.id, response);
              setResponse("");
              window.location.reload();
            }}
          >
            Respond
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default function Post() {
  let { id } = useParams();
  console.log("id: " + id);
  const [responses, setResponses] = React.useState([]);

  React.useEffect(() => {
    fetch(AuthService.API_URL + "api/responses/" + id)
      .then((res) => res.json())
      .then((data) => {
        setResponses(data);
      });
  }, []);

  const [myResponse, setMyResponse] = React.useState("");

  return (
    <>
      <Recording audio_id={+id} />
      {AuthService.isSignedIn() && <ResponseForm id={+id} />}
      <Typography align="left" variant="h4">
        Answers:
      </Typography>
      {responses.map((response: any) => (
        <Response username={response["username"]} text={response["text"]} />
      ))}
    </>
  );
}
