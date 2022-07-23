import ContextProvider from "./ContextProvider";
import AppBar from "./AppBar/AppBar";
import { ButtonStyles } from "../lib/enums";
import "../stylesheets/global.scss";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Button from "./Button/Button";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <AppBar />
        <Button
          label="Sign up for spotify"
          style={ButtonStyles.Secondary}
        />
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
