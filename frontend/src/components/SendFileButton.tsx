import * as React from "react";
import AuthService from "../services/auth";

export default function SendFileButton() {
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          let file = e.target.files;
          if (file) {
            let formData = new FormData();
            formData.append("file", file[0]);
            fetch(AuthService.API_URL + "api/recordings/upload", {
                method: "POST",
                headers: AuthService.authHeader(),
                body: formData,
            })
                .then((response) => response.text())
                .then((data) => {
                console.log(data);
                });
          }
        }}
      ></input>
    </div>
  );
}
