import { useState } from 'react';
import { extractEventHandlers } from '../utils/extractEventHandlers';
const validation = (value, rules = []) => {
	return rules.map((rule) => rule(value)).filter((v) => v !== true);
};
export const useInput = (parameters = {}) => {
	const {
		initialValue,
		disabled = false,
		error = false,
		rules = [],
		required: requiredProp = false,
	} = parameters;
	const externalEventHandlers = {
		...extractEventHandlers(parameters),
	};
	const [value, setValue] = useState(initialValue);
	const [dirty, setDirty] = useState(false);
	const [errors, setErrors] = useState(validation(value, rules));
	const [focus, setFocus] = useState(false);

	const createHandleBlur = (otherHandlers) => (event) => {
		setFocus(false);
		setDirty(true);
		otherHandlers.onBlur?.(event);
	};
	const createHandleFocus = (otherHandlers) => (event) => {
		setFocus(true);
		otherHandlers.onFocus?.(event);
	};
	const createHandleChange = (otherHandlers) => (event) => {
		setValue(e.target.value);
		setErrors(validation(e.target.value, rules));
		otherHandlers.onChange?.(event);
	};

	return {
		value,
		dirty,
		errors,
		focus,
		onBlur: createHandleBlur(externalEventHandlers),
		onFocus: createHandleFocus(externalEventHandlers),
		onChange: createHandleChange(externalEventHandlers),
	};
};
