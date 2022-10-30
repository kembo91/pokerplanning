import logo from "./logo.svg";
import "./App.css";
import PermanentDrawerLeft from "./components/menu/side_drawer";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import PokerScreen from "./components/field/poker_screen/poker_screen";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Box sx={{ display: "flex" }}>
        <PermanentDrawerLeft />
        <PokerScreen />
      </Box>
    </div>
  );
}

export default App;
