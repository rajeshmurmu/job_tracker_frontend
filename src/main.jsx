import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./App";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./store/contexts/AuthProvider";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer />
      </QueryClientProvider>
    </BrowserRouter>
  </AuthProvider>
);
