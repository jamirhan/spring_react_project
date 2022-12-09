import * as React from "react";
import AuthService from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let [clients, setClients] = React.useState("");
  let [text, setText] = React.useState("");
  // get text from /api/test/user

  React.useEffect(() => {
    fetch("http://localhost:8080/api/responses/15")
      .then((res) => res.text())
      .then((data) => {
        setText(data);
      });
  }, []);

  return (
    <div className="Home">
      <h1>Home. Home it is</h1>
    </div>
  );
  // }, []);
}
