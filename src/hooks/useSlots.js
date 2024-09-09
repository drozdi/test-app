import { isValidElement } from 'react';

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