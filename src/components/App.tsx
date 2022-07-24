import ContextProvider from "./ContextProvider";
import AppBar from "./AppBar/AppBar";
import FilterPage from "../pages/FilterPage/Filterpage";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import "../stylesheets/global.scss";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <AppBar />
        <FilterPage />
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
