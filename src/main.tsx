import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./main.css";
import { App } from "./router/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssVarsProvider defaultMode="light">
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CssVarsProvider>
  </StrictMode>
);
