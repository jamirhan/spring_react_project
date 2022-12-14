import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import AuthService from "../services/auth";

export default function NavigationBar() {
  let [signedIn, setSignedIn] = React.useState(AuthService.isSignedIn());
  return (
    <Toolbar sx={{ flexWrap: "wrap", bgcolor: "black" }}>
      <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        Bofu
      </Typography>
      <nav>
        <RouterLink to="/feed">
          <Button variant="text" sx={{ my: 1, mx: 1.5 }}>
            FEED
          </Button>
        </RouterLink>
        <RouterLink to="/">
          <Button variant="text" sx={{ my: 1, mx: 1.5 }}>
            HOME
          </Button>
        </RouterLink>
        <RouterLink to="/record">
          <Button variant="text" sx={{ my: 1, mx: 1.5 }}>
            ASK
          </Button>
        </RouterLink>
      </nav>
      {!signedIn ? (
        <>
          <RouterLink to="/login">
            <Button variant="contained" sx={{ my: 1, mx: 1.5 }}>
              Login
            </Button>
          </RouterLink>
          <RouterLink to="/register">
            <Button variant="contained" sx={{ my: 1, mx: 1.5 }}>
              Sign up
            </Button>
          </RouterLink>
        </>
      ) : (
        <Button
          variant="contained"
          sx={{ my: 1, mx: 1.5 }}
          onClick={() => {
            setSignedIn(false);
            localStorage.removeItem("user");
            window.location.reload();
          }}
        >
          Logout
        </Button>
      )}
    </Toolbar>
  );
}
