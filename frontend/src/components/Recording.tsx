import * as React from "react";

type RecordingProps = {
  audio_id: number;
};
export default function Recording(props: RecordingProps) {
  return (
    <audio
      src={"http://localhost:8080/api/recordings/" + props.audio_id + ".flac"}
      controls
    />
  );
}
