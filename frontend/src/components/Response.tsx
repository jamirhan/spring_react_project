import * as React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

type ResponseProps = {
  username: string;
  text: string;
};

const useStyles = makeStyles((theme) => ({
  post: {
    border: "solid",
    borderColor: theme.palette.primary.main,
    borderRadius: "5px",
    padding: "20px",
    width: "50%",
  },
}));

export default function Response(props: ResponseProps) {
  let classes = useStyles();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        m: "20px",
      }}
      alignItems="left"
    >
      <Box className={classes.post}>
        <Box sx={{ width: "100%", borderBottom: 1 }}>
          <Typography variant="h4" align="left">
            from: {props.username}
          </Typography>
        </Box>
        <Typography variant="h5">{props.text}</Typography>
      </Box>
    </Box>
  );
}
