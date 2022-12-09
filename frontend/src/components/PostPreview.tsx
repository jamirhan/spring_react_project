import * as React from "react";
import ReactAudioPlayer from "react-audio-player";
import { Link } from "react-router-dom";
import Recording from "./Recording";

type PostPrevProps = {
  audio_id: number;
};

export default function PostPreview(props: PostPrevProps) {
  return (
    <div className="Post">
      <Recording audio_id={props.audio_id} />
      <Link to={`/post/${props.audio_id}`}>View</Link>
    </div>
  );
}
