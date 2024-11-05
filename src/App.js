import { Link, Route, Routes } from 'react-router-dom';
import { AppProvider } from './components/app';
import {
	BtnExample,
	BtnGroupExample,
	InputExample,
	ListExample,
	MessageExample,
} from './components/example';
import { XIcon, XItem, XItemLabel, XItemSection, XList } from './components/ui';
import { XLayout } from './components/ui/layout';
function App() {
	return (
		<AppProvider config={{ smKey: 'app-1' }}>
			<XLayout container={true} overlay={true} toggle={true} view="lhr lpr lff">
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
							<XItem to="/message" LinkComponent={Link}>
								<XItemSection side={true}>
									<XIcon>mdi-message-alert-outline</XIcon>
								</XItemSection>
								<XItemSection>
									<XItemLabel lines={true}>XMessage</XItemLabel>
								</XItemSection>
							</XItem>
						</XList>
					),
					header: 'header',
					footer: 'footer',
					//right: 'right',
					default: (props) => (
						<Routes>
							<Route path="/" element={<div>Home</div>} />
							<Route path="/btn" element={<BtnExample />} />
							<Route path="/btn-group" element={<BtnGroupExample />} />
							<Route path="/input" element={<InputExample />} />
							<Route path="/list" element={<ListExample />} />
							<Route path="/message" element={<MessageExample />} />
						</Routes>
					),
				}}
			</XLayout>
		</AppProvider>
	);
}

export default App;
