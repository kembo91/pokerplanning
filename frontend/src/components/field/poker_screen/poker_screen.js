import { Box } from "@mui/material";
import React from "react";
import ChoiceField from "../choice_field/choice_field";
import ResultButton from "../result_button/result_button";
import ResultField from "../result_field/result_field";

const PokerScreen = () => {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <ResultButton text="New game" />
      <ResultField />
      <ChoiceField />
    </Box>
  );
};

export default PokerScreen;
