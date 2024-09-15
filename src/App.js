import { XLayout } from "./components/ui/layout/XLayout";
import { XSidebar } from "./components/ui/sidebar/XSidebar";
function App() {
  return (<XLayout container={true} view="hhh lpr lff">
    {{
      left: (props) => (<ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
          <li>Item 4</li>
      </ul>),
      right: (props) => (<XSidebar>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
      </ul>
      </XSidebar>),
      header: 'header',
      footer: 'footer',
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
  