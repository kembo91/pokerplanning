import { Box } from "@mui/system";
import React from "react";
import ChoiceButton from "../choice_button/fibutton";

const ChoiceField = () => {
  const fib = [1, 2, 3, 5, 8, 13, 21, 34];
  return (
    <Box>
      {fib.map((val, ix) => (
        <ChoiceButton variant="outlined" number={val} />
      ))}
    </Box>
  );
};

export default ChoiceField;
