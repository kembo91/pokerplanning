import { Button } from "@mui/material";
import React from "react";

const ChoiceButton = ({ variant, number }) => {
  return <Button variant={variant}>{number}</Button>;
};

export default ChoiceButton;
