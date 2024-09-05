import React, { useState } from 'react';

import { XFooter, XHeader, XLayout, XMain } from "./components/ui/layout/XLayout";

import { XSidebar } from "./components/ui/sidebar/XSidebar";

function App() {
    const [mini, setMini] = useState(false);
    const [open, setOpen] = useState(true);
    const [miniToOverlay, setMiniToOverlay] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [m, setM] = useState(56);
    return (<XLayout container={true}>
      <XHeader>
        header
      </XHeader>
      <XFooter>
        footer
      </XFooter>
      <XSidebar 
        type="left"
        mini={mini} 
        open={open}
        breakpoint={600}
        overlay={overlay}
        miniToOverlay={miniToOverlay}
        /*onMouseEnter={() => setMini(false)}
        onMouseLeave={() => setMini(true)}*/
        onUpM={v=>setM(v)}>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
        </ul>
      </XSidebar>
      <XMain>
        <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
        <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
        <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
        <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
        <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
        <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
        <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
        <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
        <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
      </XMain>
    </XLayout>);
  }
  
  export default App;
  