import ContextProvider from "./ContextProvider";
import AppBar from "./AppBar/AppBar";
import { ButtonStyles } from "../lib/enums";
import filterIcon from "../static/icons/filter.svg";
import "../stylesheets/global.scss";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Button from "./Button/Button";
import IconButton from "./IconButton/IconButton";
import ArtistCard from "./ArtistCard/ArtistCard";
import SongCard from "./SongCard/SongCard";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <AppBar />
        <Button label="Authorize" style={ButtonStyles.Primary} />
        <Button
          label="Sign up for spotify"
          style={ButtonStyles.Secondary}
        />
        <IconButton iconSrc={filterIcon} />
        <SongCard imgSrc="" name="Deaf Radio" album="Greek" />
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
