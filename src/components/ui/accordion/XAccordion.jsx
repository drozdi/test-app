import { XAccordionContext } from './XAccordionContext';
export function XAccordion({ children, className }) {
	const context = {};
	return (
		<div>
			<XAccordionContext.Provider value={context}>
				{children}
			</XAccordionContext.Provider>
		</div>
	);
}
