import * as React from "react";
import PostPreview from "./PostPreview";
import AuthService from "../services/auth";

type FeedProps = {};

export default function Feed(props: FeedProps) {
  console.log("Feed");
  let [ids, setIds] = React.useState([]);
  // get text from /api/recordings/my
  React.useEffect(() => {
    fetch(AuthService.API_URL + "api/recordings/all", {
      headers: AuthService.authHeader(),
    })
      .then((res) => res.json())
      .then((data) => {
        setIds(data);
      });
  }, []);
  return (
    <div className="Feed">
      <h1>Feed</h1>
      {ids.map((id: number) => (
        <PostPreview audio_id={id} />
      ))}
    </div>
  );
}
