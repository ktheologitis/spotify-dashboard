import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import AuthorizationContextProvider from "./contextProviders/AuthorizationContextProvider";
import FiltersContextProvider from "./contextProviders/FiltersContextProvider";
import App from "./components/App";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthorizationContextProvider>
          <FiltersContextProvider>
            <App />
          </FiltersContextProvider>
        </AuthorizationContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
