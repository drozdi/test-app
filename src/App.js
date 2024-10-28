import  { BtnExample} from './components/example';
import { XLayout } from'./components/ui/layout';
import { XList, XItem, XItemSection, XItemLabel } from'./components/ui';
import { Route, Link } from 'react-router-dom';
function App() {
  return (<XLayout container={true} overlay={true} view="hhr lpr lff">
      {{
							left: (props) => (
								<XList>
                  <XItem to="/btn" LinkComponent={Link}>
                    <XItemSection side={true}>
                      <XIcon>mdi-home</XIcon>
                    </XItemSection>
                    <XItemSection>Yandex</XItemSection>
                  </XItem>
                </XList>
							),
							right: (props) => (
								<>right</>
							),
							header: 'header',
							footer: 'footer',
							default: (props) => (
								<Routes>
                  <Route path="/"  element={<div>Home</div>} />
                  <Route path="/btn" element={<BtnExample />} />
                </Routes>
							),
						}}

  </XLayout>)
  
  /*
        
        <Route path="/todo/:id" element={<TodoPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>*/
	//return <Example list={true} btnGroup={true} btn={true} input={true} />;
	/*const ref = useRef(null);
	useEffect(() => {
		//console.log(ref);
		/*setTimeout(() => {
			ref.current.w = '50%';
		}, 1000);
		setTimeout(() => {
			ref.current.x = 'center';
		}, 2000);
		setTimeout(() => {
			ref.current.y = 'center';
		}, 3000);
		setTimeout(() => {
			ref.current.h = '50%';
		}, 4000);*/
	/*}, [ref]);
	return (
		<>
			<AppProvider config={{ smKey: 'app-1' }}>
				<XWindow className="bg-blue-900" title="win">
					<XLayout container={true} overlay={true} view="hhr lpr lff">
						{{
							left: (props) => (
								<ul>
									<li>Item 1</li>
									<li>Item 2</li>
									<li>Item 3</li>
									<li>Item 4</li>
									<li>Item 1</li>
									<li>Item 2</li>
									<li>Item 3</li>
									<li>Item 4</li>
									<li>Item 1</li>
									<li>Item 2</li>
									<li>Item 3</li>
									<li>Item 4</li>
									<li>Item 1</li>
									<li>Item 2</li>
									<li>Item 3</li>
									<li>Item 4</li>
								</ul>
							),
							right: (props) => (
								<XSidebar>
									<ul>
										<li>Item 1</li>
										<li>Item 2</li>
										<li>Item 3</li>
										<li>Item 4</li>
									</ul>
								</XSidebar>
							),
							header: 'header',
							footer: 'footer',
							default: (props) => (
								<>
									<p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
									<p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
									<p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
									<p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
									<p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
									<p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
									<p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
									<p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
									<p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
								</>
							),
						}}
					</XLayout>
				</XWindow>
			</AppProvider>
		</>
	);

	/*return (
		<XLayout container={true} overlay={true} view="hhr lpr lff">
			{{
				left: (props) => (
					<ul>
						<li>Item 1</li>
						<li>Item 2</li>
						<li>Item 3</li>
						<li>Item 4</li>
						<li>Item 1</li>
						<li>Item 2</li>
						<li>Item 3</li>
						<li>Item 4</li>
						<li>Item 1</li>
						<li>Item 2</li>
						<li>Item 3</li>
						<li>Item 4</li>
						<li>Item 1</li>
						<li>Item 2</li>
						<li>Item 3</li>
						<li>Item 4</li>
					</ul>
				),
				right: (props) => (
					<XSidebar>
						<ul>
							<li>Item 1</li>
							<li>Item 2</li>
							<li>Item 3</li>
							<li>Item 4</li>
						</ul>
					</XSidebar>
				),
				header: 'header',
				footer: 'footer',
				default: (props) => (
					<>
						<p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
						<p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
						<p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
						<p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
						<p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
						<p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
						<p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
						<p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
						<p>sfsdjfhsdjk wsgkhsgs wergjerlkgjer</p>
					</>
				),
			}}
		</XLayout>
	); //*/
}

export default App;
