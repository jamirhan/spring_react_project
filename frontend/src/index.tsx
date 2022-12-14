import * as React from "react";
import App from "./components/App";
import { createRoot } from "react-dom/client";
import "./styles.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
