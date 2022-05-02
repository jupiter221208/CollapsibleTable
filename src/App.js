import React from "react";

import Box from "@mui/material/Box";

// custom components
import CollapsibleTable from "./components/CollapsibleTable";
import PieChart from "./components/PieChart";

const App = () => {
  return (
    <Box>
      <CollapsibleTable />
      <PieChart />
    </Box>
  );
};

export default App;
