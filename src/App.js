import React, { useState } from 'react';

import Button from '@mui/material/Button';

import { XLayout, XHeader, XFooter, XSideBar, XMain } from "./components/ui/layout/XLayout";

function App() {
  return (<XLayout container={true} view="hhr lbr lff">
    <XHeader>
      <Button variant="contained" color="primary">primary</Button>
    </XHeader>
    <XSideBar open={false} type='left'>left</XSideBar>
    <XSideBar open={false} type='right'>right</XSideBar>
    <XMain>
      <h1>body</h1>
    </XMain>
    <XFooter>
      footer
    </XFooter>
  </XLayout>);
}

export default App;
