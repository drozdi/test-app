import { XLayout } from './components/ui/layout';
import { XSidebar } from './components/ui/sidebar';

function App() {
	/*return (
		<div className="grid grid-rows-layout grid-cols-layout gap-2 w-full h-full">
			<div className="row-start-1 row-end-2 col-start-1 col-end-4 max-w-full min-h-12 bg-bgmb1" />
			<div className="row-start-3 row-end-4 col-start-1 col-end-4 max-w-full min-h-12 bg-bgmb2" />
			<div className="row-start-2 row-end-3 col-start-1 col-end-2 min-w-32 max-w-96 bg-bgmb3 relative">
				<div className="w-2 cursor-col-resize absolute top-0 bottom-0 right-0 bg-primary"></div>
			</div>
			<div className="row-start-2 row-end-3 col-start-3 col-end-4 min-w-32 max-w-96 bg-bgmb4 relative">
				<div className="w-2 cursor-col-resize absolute top-0 bottom-0 left-0 bg-primary"></div>
			</div>
			<div className="row-start-2 row-end-3 col-start-2 col-end-3 bg-bgmb5" />
		</div>
	); //*/

	return (
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
