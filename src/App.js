import React, { useState } from 'react';

import { XSidebar } from "./components/ui/sidebar/XSidebar";

function App() {
    const [mini, setMini] = useState(false);
    const [open, setOpen] = useState(false);
    return (<><XSidebar 
        type="left"
        mini={mini} 
        open={open}
        miniToOverlay={true} 
        onMouseEnter={() => setMini(false)} 
        onMouseLeave={() => setMini(true)}>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
        </ul>
      </XSidebar>
      <div className='flex flex-col' style={{
        position: 'fixed',
        right: 20,
        top: 20
      }}>
        <button className='bg-dimmed px-3 py-4 border border-separate' onClick={() => setMini(!mini)}>mini: {mini? 'true': 'false'}</button>
        <button className='bg-dimmed px-3 py-4 border border-separate mt-3' onClick={() => setOpen(!open)}>open: {open? 'true': 'false'}</button>
      </div>
    </>);
  }
  
  export default App;
  