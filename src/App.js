import React from 'react';

import { XSidebar } from "./components/ui/sidebar/XSidebar";

function App() {
    return (<XSidebar collapsing={true} collapsedForOverlay={true}>
      <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
      </ul>
    </XSidebar>);
  }
  
  export default App;
  