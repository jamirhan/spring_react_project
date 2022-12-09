import * as React from "react";
import { Howl } from "howler";
import RecordButton from "./RecordButton";
import AuthService from "../services/auth";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Feed from "./Feed";
import Post from "./Post";

const useAudio = (url: string): [boolean, () => void] => {
  const [audio] = React.useState(new Audio(url));
  console.log(url);
  const [playing, setPlaying] = React.useState(false);

  const toggle = () => {
    setPlaying(!playing);
  };

  React.useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  React.useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

type PlayerProps = {
  url: string;
};

const Player = (props: PlayerProps) => {
  const [playing, toggle] = useAudio(props.url);

  console.log("we got here");

  return (
    <div>
      <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
    </div>
  );
};

const soundPlay = (src: string) => {
  const sound = new Howl({
    src,
    html5: true,
  });
  sound.play();
};

const MusicButton = (props: PlayerProps) => {
  return (
    <div>
      {/* <MusicButton url="http://localhost:8080/recordings/11.flac" /> */}
      <audio src={props.url} controls />
    </div>
  );
};

type AppProps = {};

export default function App(props: AppProps) {
  let [clients, setClients] = React.useState("");
  let [text, setText] = React.useState("");
  // get text from /api/test/user
  // React.useEffect(() => {
  // fetch("/api/test/user", {
  // headers: AuthService.authHeader(),
  // })
  // .then((res) => res.json())
  // .then((data) => {
  // setText(data.text);
  // });
  // }, []);

  return (
    <div className="App">
      <RecordButton />
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/feed">Feed</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </div>
  );
  // fetch response as string
  // React.useEffect(() => {
  // fetch("http://localhost:8080/clients")
  // .then((response) => response.text())
  // .then((data) => {
  // setClients(data);
  // });
  // }, []);
  // fetch music file from localhost:8080/recordings/11:
  // React.useEffect(() => {
  //   fetch("http://localhost:8080/recordings/11")
  //     .then((response) => response.blob())
  //     .then((data) => {
  //       setClients(data);

  // return (
  //   <div className="App">
  //     {/* <MusicButton url="http://localhost:8080/recordings/11.flac" /> */}
  //     <audio src="http://localhost:8080/recordings/11.flac" controls />
  //   </div>
  // );
}
