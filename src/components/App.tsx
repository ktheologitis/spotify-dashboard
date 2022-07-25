import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import AuthorizationContextProvider from "../contextProviders/AuthorizationContextProvider/AuthorizationContextProvider";
import FiltersContextProvider from "../contextProviders/FiltersContextProvider/FiltersContextProvider";
import UserDataContextProvider from "../contextProviders/UserDataContextProvider/UserDataContextProvider";
import Routing from "../Routing";
import "../stylesheets/global.scss";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthorizationContextProvider>
        <UserDataContextProvider>
          <FiltersContextProvider>
            <Routing />
          </FiltersContextProvider>
        </UserDataContextProvider>
      </AuthorizationContextProvider>
    </QueryClientProvider>
  );
}

export default App;
