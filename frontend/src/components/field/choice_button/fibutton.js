import { Button } from "@mui/material";
import React from "react";

const ChoiceButton = ({ variant, number }) => {
  return (
    <Button sx={{ marginRight: 1, marginLeft: 1 }} variant={variant}>
      {number}
    </Button>
  );
};

export default ChoiceButton;
