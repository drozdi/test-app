import React from 'react';

import { XLayout } from "./components/ui/layout/XLayout";


function App() {
    return (<XLayout container={true} view="hhh lpr lff">
      {{
        left: (props) => (<ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
        </ul>),
        right: (props) => (<ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
        </ul>),
        header: (props) => 'header',
        footer: (props) => 'footer',
        default: (props) => (<>
          <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
          <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
          <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
          <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
          <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
          <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
          <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
          <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
          <p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
        </>)
      }}
    </XLayout>);
  }
  
  export default App;
  