import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./contexts/auth.context";
import "./main.css";
import { App } from "./router/app";
import { theme } from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssVarsProvider defaultMode="light" theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthContextProvider>
          <App />
          <ToastContainer />
        </AuthContextProvider>
      </BrowserRouter>
    </CssVarsProvider>
  </StrictMode>
);
