import React, { useState } from 'react';


import { XLayout, XHeader, XFooter, XSideBar, XMain } from "./components/ui/layout/XLayout";

function App() {
  return (<XLayout container={true} view="hhr lbr lff">
    <XHeader>
      
    </XHeader>
    <XSideBar type='left'>left</XSideBar>
    <XSideBar type='right'>right</XSideBar>
    <XMain>
      <h1>body</h1>
    </XMain>
    <XFooter>
      footer
    </XFooter>
  </XLayout>);
}

export default App;
