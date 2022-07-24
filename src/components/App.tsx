import ContextProvider from "./ContextProvider";
import AppBar from "./AppBar/AppBar";
import RecommendationsPage from "../pages/RecommendationsPage/RecommendationPage";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import "../stylesheets/global.scss";
import FilterPage from "../pages/FilterPage/Filterpage";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <AppBar />
        <RecommendationsPage />
        {/* <FilterPage /> */}
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
