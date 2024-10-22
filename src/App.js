import Example from './components/example';
import { XListGroup, XListGroupItem, XListItem } from './components/ui';

function App() {
	return <XListGroup>
			<XListItem>Item 1</XListItem>
			<XListItem>Item 2</XListItem>
			<XListItem>Item 3</XListItem>
			<XListItem>Item 4</XListItem>
	</XListGroup>
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
