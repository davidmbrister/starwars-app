import React, { useEffect } from "react";
import Fetch from "../../Fetch";
import { namesArray } from "../../helpers/names";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function SelectedListItem() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    // use the selected index to trigger a fetch call
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.blue" }}>
      <List component="nav" aria-label="secondary mailbox folder">
        {!namesArray
          ? null
          : namesArray.map((item, index) => {
              return (
                <ListItemButton key={index}>
                  <ListItemText primary={item} />
                </ListItemButton>
              );
            })}
      </List>
    </Box>
  );
}
