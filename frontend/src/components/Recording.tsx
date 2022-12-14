import * as React from "react";
import AuthService from "../services/auth";
import { Box } from "@mui/system";

type RecordingProps = {
  audio_id: number;
};
export default function Recording(props: RecordingProps) {
  return (
    <Box
      sx={{
        m: "5px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
      }}
      alignContent="center"
    >
      <audio
        src={
          AuthService.API_URL +
          "api/recordings/" +
          props.audio_id.toString() +
          ".flac"
        }
        controls
      />
    </Box>
  );
}
