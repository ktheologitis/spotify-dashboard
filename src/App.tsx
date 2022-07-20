import ContextProvider from "./components/ContextProvider";
import Child from "./components/Child";
import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <Child />
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
