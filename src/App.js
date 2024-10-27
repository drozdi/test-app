import { XIcon, XItem, XItemLabel, XItemSection, XList } from './components/ui';

function App() {
	return (
		<div className="w-64 absolute left-1/2 -translate-x-1/2 top-12">
			<XList bordered={true} separator={true}>
				<XItem tag="label">
					<XItemSection side={true}>
						<input type="checkbox" value={1} disabled />
					</XItemSection>
					<XItemSection>
						<XItemLabel>Item 1</XItemLabel>
					</XItemSection>
				</XItem>
				<XItem tag="label">
					<XItemSection side={true}>
						<input type="checkbox" value={2} />
					</XItemSection>
					<XItemSection>
						<XItemLabel>Item 2</XItemLabel>
					</XItemSection>
				</XItem>
				<XItem tag="label">
					<XItemSection side={true}>
						<input type="checkbox" value={3} />
					</XItemSection>
					<XItemSection>
						<XItemLabel>Item 3</XItemLabel>
					</XItemSection>
				</XItem>
				<XItem>
					<XItemSection side={true}>
						<XIcon>mdi-home</XIcon>
					</XItemSection>
					<XItemSection>
						<XItemLabel overline={true}>Item 1</XItemLabel>
						<XItemLabel>label</XItemLabel>
						<XItemLabel caption={true}>Description</XItemLabel>
					</XItemSection>
					<XItemSection side={true} top={true}>
						<XIcon>mdi-close</XIcon>
					</XItemSection>
				</XItem>
				<XItem to="https://ya.ru/" target="_blank" disabled={true}>
					<XItemSection side={true}>
						<XIcon>mdi-home</XIcon>
					</XItemSection>
					<XItemSection>Yandex</XItemSection>
				</XItem>
				<XItem disabled={true}>
					<XItemSection>Item 3</XItemSection>
					<XItemSection side={true}>
						<XIcon>mdi-arrow-down</XIcon>
					</XItemSection>
				</XItem>
				<XItem active={true}>
					<XItemSection>Item 4</XItemSection>
				</XItem>
			</XList>
		</div>
	);
	//return <Example btnGroup={true} btn={true} input={true} />;
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
