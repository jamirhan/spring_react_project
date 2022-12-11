import * as React from "react";
import AuthService from "../services/auth"

type RecordingProps = {
  audio_id: number;
};
export default function Recording(props: RecordingProps) {
  return (
    <audio
      src={AuthService.API_URL + "api/recordings/" + props.audio_id + ".flac"}
      controls
    />
  );
}
