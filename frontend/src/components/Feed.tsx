import * as React from "react";
import PostPreview from "./PostPreview";
import AuthService from "../services/auth";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type FeedProps = {};

export default function Feed(props: FeedProps) {
  console.log("Feed");
  let [idAndUsername, setIdAndUsername] = React.useState([]);
  React.useEffect(() => {
    fetch(AuthService.API_URL + "api/recordings/all", {
      headers: AuthService.authHeader(),
    })
      .then((res) => res.json())
      .then((data) => {
        let ids: any[] = [];
        data.map((mini_map: any) => {
          for (let [key, value] of Object.entries(mini_map)) {
            ids.push([key, value]);
          }
        });
        setIdAndUsername(ids);
        console.log(ids);
      });
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
        alignItems="center"
      >
        <Typography variant="h2" gutterBottom>
          Feed
        </Typography>
      </Box>
      <Grid container spacing={1} alignContent="center">
        {idAndUsername.map((p) => {
          p[0] = +p[0];
          console.log(p);
          return (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
              alignItems="center"
            >
              <PostPreview audio_id={p[0]} from_username={p[1]} />
            </Box>
          );
        })}
      </Grid>
    </>
  );
}
