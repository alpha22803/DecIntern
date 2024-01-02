import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import PermanentDrawerLeft from "./Components/PermanentDrawer/PermanentDrawer";

function App() {
  return (
    <ScopedCssBaseline>
      <PermanentDrawerLeft />
    </ScopedCssBaseline>
  );
}

export default App;
