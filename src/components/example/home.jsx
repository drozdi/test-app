import { createElement, forwardRef } from 'react';

function forwardRefWithAs(component, displayName) {
	return Object.assign(forwardRef(component), {
		displayName: component.displayName ?? component.name,
	});
}

function render({ as, ...props }) {
	return createElement(as, props);
}

function BtnFn({ children, as = 'button' }, ref) {
	return <button className="p-2 bg-green-600">{children}</button>;
}

const Btn = forwardRefWithAs(BtnFn, 'Btn');

export function HomeExample() {
	return (
		<div className="p-4">
			<Btn>Test</Btn>
		</div>
	);
}
