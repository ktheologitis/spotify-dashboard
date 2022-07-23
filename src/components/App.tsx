import ContextProvider from "./ContextProvider";
import Child from "./Child";
import "../stylesheets/global.scss";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

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
