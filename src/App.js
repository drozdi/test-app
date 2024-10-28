import { BtnExample, InputExample, BtnGroupExample, ListExample } from './components/example';
import { AppProvider } from'./components/app';
import { XLayout } from'./components/ui/layout';
import { XIcon, XList, XItem, XItemSection, XItemLabel } from'./components/ui';
import { Routes, Route, Link } from 'react-router-dom';
function App() {
  return (
    <AppProvider config={{ smKey: 'app-1' }}>
      <XLayout container={true} overlay={true} view="lhr lpr lff">
      {{
			left: (props) => (
				<XList separator={true}>
                  <XItem to="/btn" LinkComponent={Link}>
				 	 <XItemSection side={true}>
						<XIcon>mdi-button-pointer</XIcon>
				  	</XItemSection>
                    <XItemSection>
						<XItemLabel lines={true}>XBtn</XItemLabel>
					</XItemSection>
                  </XItem>
                  <XItem to="/btn-group" LinkComponent={Link}>
					<XItemSection side={true}>
						<XIcon>mdi-card-outline</XIcon>
					</XItemSection>
                    <XItemSection>
						<XItemLabel lines={true}>XBtnGroup</XItemLabel>
					</XItemSection>
                  </XItem>
                  <XItem to="/input" LinkComponent={Link}>
					<XItemSection side={true}>
						<XIcon>mdi-form-textbox</XIcon>
					</XItemSection>
                    <XItemSection>
						<XItemLabel lines={true}>XInput</XItemLabel>
					</XItemSection>
                  </XItem>
                  <XItem to="/list" LinkComponent={Link}>
                    <XItemSection side={true}>
						<XIcon>mdi-view-list</XIcon>
					</XItemSection>
					<XItemSection>
						<XItemLabel lines={true}>XList</XItemLabel>
					</XItemSection>
                  </XItem>
                </XList>
			),
			right: (props) => <>right</>,
			header: 'header',
			footer: 'footer',
			default: (props) => (
				<Routes>
					<Route path="/"  element={<div>Home</div>} />
					<Route path="/btn" element={<BtnExample />} />
					<Route path="/btn-group" element={<BtnGroupExample />} />
					<Route path="/input" element={<InputExample />} />
					<Route path="/list" element={<ListExample />} />
				</Routes>
			),
		}}
	  </XLayout>
  </AppProvider>)
}

export default App;
