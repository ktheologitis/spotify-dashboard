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
import SongCard from "./SongCard/SongCard";
import Input from "./Input/Input";
import Dialog from "./Dialog/Dialog";
import Slider from "@mui/material/Slider";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1db954" },
  },
});

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        {/* <Dialog
          header="Your authorization has expired."
          message="Please re-authorize."
          buttonLabel="Re-authorize"
        /> */}
        <AppBar />
        <Button label="Authorize" style={ButtonStyles.Primary} />
        <Button
          label="Sign up for spotify"
          style={ButtonStyles.Secondary}
        />
        <IconButton iconSrc={filterIcon} />
        <SongCard imgSrc="" name="Deaf Radio" album="Greek" />
        <Input label="Artist" />
        <ThemeProvider theme={theme}>
          <Slider />
        </ThemeProvider>
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
