import * as React from "react";
import { useParams } from "react-router-dom";
import Recording from "./Recording";
import Response from "./Response";
import AuthService from "../services/auth";

const send_response = async (post_id: number, text: string) => {
  let jsontext = JSON.stringify({
    text: text,
    postId: post_id,
  });
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  console.log("jsontext: " + jsontext);

  await fetch("http://localhost:8080/api/responses/new", {
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

export default function Post() {
  let { id } = useParams();
  console.log("id: " + id);
  const [responses, setResponses] = React.useState([]);
  // get ids from /api/responses/:id
  React.useEffect(() => {
    fetch("http://localhost:8080/api/responses/" + id)
      .then((res) => res.json())
      .then((data) => {
        setResponses(data);
      });
  }, []);

  const [myResponse, setMyResponse] = React.useState("");
  return (
    <div>
      <Recording audio_id={+id} />
      {responses.map((response: any) => (
        <Response from_id={response["ownerId"]} text={response["text"]} />
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setMyResponse("");
          send_response(+id, myResponse).then(() => {
            // refresh responses
            fetch("http://localhost:8080/api/responses/" + id)
              .then((res) => res.json())
              .then((data) => {
                setResponses(data);
              });
          });
        }}
      >
        <input
          name="email"
          type="text"
          onChange={(e) => {
            setMyResponse(e.target.value);
          }}
          value={myResponse}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
