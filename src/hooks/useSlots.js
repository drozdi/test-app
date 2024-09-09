import { Fragment, createElement as h, isValidElement, useMemo } from 'react';

export function createSlots (defaults = {}) {
	return (children) => {
		if (isValidElement(children)) {
			return [{
				...defaults,
				default: (props) => children
			}, {
				default: true
			}];
		}
		if (Array.isArray(children)) { 
			let is = {};
			
			return [children.filter((e) => !isValidElement(e)).reduce((acc, elements) => {
				is = {...is, 
					...Object.fromEntries(Object.keys(elements).map((slot) => [slot, true]))
				};
				return {
					...acc,
					...elements
				};
			}, {
				...defaults,
				default: (props) => children.filter(isValidElement)
			}), is];
		}
		return [{
			...defaults,
			default: (props) => null,
			...children
		}, Object.fromEntries(Object.keys(children).map((slot) => [slot, true]))];
	}
}

export function useSlots (children) {
	const slots = useMemo(() => {
		let tmpChildren = children;
		if (children?.type === Fragment) {
			tmpChildren = children.props.children;
		}
		tmpChildren = Array.isArray(tmpChildren) ? tmpChildren : [tmpChildren];
		const collect = {
			default: []
		};

		function addCollect (slotName, child) {
			if (!collect[slotName]) {
				collect[slotName] = [];
			}
			collect[slotName].push(child);
		}
		
		for (const child of tmpChildren) {
			if (isValidElement(child)) {
				addCollect(child?.props?.slot || "default", child)
			} else {
				for (const name in child) {
					addCollect(name, child[name]);
				}
			}
		}
		return collect;
	}, [children]);

	const slot = (name = "", defaultChildren = [], ...args) => {
		name ||= 'default';

		const children = slots[name] ?? (Array.isArray(defaultChildren)? defaultChildren: [defaultChildren]);
		
		return h(Fragment, {}, children.map((child) => {
			if (isValidElement(child)) {
				return child;
			} else if (typeof child === 'function') {
				return child(...args);
			}
		}));
	};

	const has = (slot) => {
		return slots.hasOwnProperty(slot) && slots[slot].length > 0;
	};
	console.log(slots);
	return [slot, has]
}