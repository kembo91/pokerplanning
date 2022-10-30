import { Button } from "@mui/material";
import React from "react";

const ResultButton = ({ text }) => {
  return (
    <Button sx={{ margin: 1 }} variant="outlined">
      {text}
    </Button>
  );
};

export default ResultButton;
