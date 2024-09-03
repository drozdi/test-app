import React, { useState } from 'react';

import { XSidebar } from "./components/ui/sidebar/XSidebar";

function App() {
    const [mini, setMini] = useState(false);
    const [open, setOpen] = useState(false);
    const [miniToOverlay, setMiniToOverlay] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [m, setM] = useState(56);
    return (<><XSidebar 
        type="left"
        mini={mini} 
        open={open}
        overlay={overlay}
        miniToOverlay={miniToOverlay}
        onMouseEnter={() => setMini(false)}
        onMouseLeave={() => setMini(true)}
        onUpM={v=>setM(v)}>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
        </ul>
      </XSidebar>
      <div style={{
        marginLeft: m
      }}>
      <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
      <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
      <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
      <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
      <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
      <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
      <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
      <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
      <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
      </div>
      <div className='flex flex-col space-y-2' style={{
        position: 'fixed',
        right: 20,
        top: 20
      }}>
        <button className='bg-dimmed px-3 py-4 border border-separate' onClick={() => setOpen(!open)}>open: {open? 'true': 'false'}</button>
        <button className='bg-dimmed px-3 py-4 border border-separate' onClick={() => setMini(!mini)}>mini: {mini? 'true': 'false'}</button>
        <button className='bg-dimmed px-3 py-4 border border-separate' onClick={() => setOverlay(!overlay)}>overlay: {overlay? 'true': 'false'}</button>
        <button className='bg-dimmed px-3 py-4 border border-separate' onClick={() => setMiniToOverlay(!miniToOverlay)}>miniToOverlay: {miniToOverlay? 'true': 'false'}</button>
      </div>
    </>);
  }
  
  export default App;
  