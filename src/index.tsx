import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AuthorizationContextProvider from "./contextProviders/AuthorizationContextProvider";
import FiltersContextProvider from "./contextProviders/FiltersContextProvider";
import UserDataContextProvider from "./contextProviders/UserDataContextProvider";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthorizationContextProvider>
          <UserDataContextProvider>
            <FiltersContextProvider>
              <App />
            </FiltersContextProvider>
          </UserDataContextProvider>
        </AuthorizationContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
