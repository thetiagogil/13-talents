import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./contexts/auth.context";
import "./main.css";
import { App } from "./router/app";
import { theme } from "./theme";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssVarsProvider defaultMode="light" theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <App />
            <ToastContainer />
          </AuthContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </CssVarsProvider>
  </StrictMode>
);
