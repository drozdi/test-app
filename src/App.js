import { XIcon, XItem, XItemLabel, XItemSection, XListGroup } from './components/ui';

function App() {
	return (
		<div className="w-64 absolute left-1/2 -translate-x-1/2 top-12">
			<XListGroup>
				<XItem>
					<XItemSection side={true}>
						<XIcon>mdi-home</XIcon>
					</XItemSection>
					<XItemSection>
						<XItemLabel overline={true}>Item 1</XItemLabel>
						<XItemLabel>label</XItemLabel>
						<XItemLabel caption={true}>Description</XItemLabel>
					</XItemSection>
					<XItemSection side={true}>S</XItemSection>
				</XItem>
				<XItem>
					<XItemSection side={true}>
						<XIcon>mdi-home</XIcon>
					</XItemSection>
					<XItemSection>Item 2</XItemSection>
				</XItem>
				<XItem>
					<XItemSection>Item 3</XItemSection>
				</XItem>
				<XItem>
					<XItemSection>Item 4</XItemSection>
				</XItem>
			</XListGroup>
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
