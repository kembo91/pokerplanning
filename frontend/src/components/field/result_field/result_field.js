import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ChoiceButton from "../choice_button/fibutton";

const ResultField = () => {
  const players = ["kembo", "sombody", "joli", "alex", "mona"];
  return (
    <Box component="div" sx={{ margin: 25 }}>
      {players.map((val, ix) => (
        <Box
          component="div"
          sx={{
            marginRight: 1,
            marginLeft: 1,
            width: 100,
            display: "inline-block",
          }}
        >
          <Typography>{val}</Typography>
          <ChoiceButton variant="contained" number={ix} />
        </Box>
      ))}
    </Box>
  );
};

export default ResultField;
