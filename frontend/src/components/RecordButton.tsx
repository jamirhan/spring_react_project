import * as React from "react";
import AuthService from "../services/auth";

export default function RecordButton() {
  const [recorder, setRecorder] = React.useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = React.useState(false);
  const click = () => {
    console.log("clicked");
    if (isRecording) {
      console.log("stopping");
      if (recorder == null) {
        throw new Error("recorder is null");
      }
      recorder.stop();
      setIsRecording(false);
    } else {
      console.log("starting");
      setIsRecording(true);
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        const audioChunks: any = [];
        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
        });

        const upload = (raw: Blob) => {
          let file = new File([raw], "test.flac", { type: "audio/flac" });
          let formData = new FormData();
          formData.append("file", file);
          fetch(AuthService.API_URL + "api/recordings/upload", {
            method: "POST",
            headers: AuthService.authHeader(),
            body: formData,
          })
            .then((response) => response.text())
            .then((data) => {
              console.log(data);
            });
        };

        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          upload(audioBlob);
        });

        setRecorder(mediaRecorder);
      });
      console.log("started");
    }
  };
  return (
    <button className="RecordButton" onClick={click}>
      {isRecording ? "Stop" : "Record"}
    </button>
  );
}
