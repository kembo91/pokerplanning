import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SpeedDialIcon,
} from "@mui/material";
import DeviceHubRoundedIcon from "@mui/icons-material/DeviceHubRounded";

const DrawerItem = (names) => {
  console.log(names);
  return names.names.map((text, ix) => (
    <ListItem key={text} disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <DeviceHubRoundedIcon />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  ));
};

export default DrawerItem;
