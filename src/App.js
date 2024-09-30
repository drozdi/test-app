import { useEffect, useRef } from 'react';
import { XLayout } from './components/ui/layout';
import { XSidebar } from './components/ui/sidebar';
import { XWindow } from './components/ui/window';
function App() {
	const ref = useRef(null);
	useEffect(() => {
		console.log(ref);

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
	}, [ref]);
	return (
		<>
			<XWindow ref={ref} className="bg-blue-900" title="test">
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
