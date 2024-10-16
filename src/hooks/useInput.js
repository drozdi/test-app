import { useRef, useState } from 'react';
const validation = (value, rules = []) => {
	return rules.map((rule) => rule(value)).filter((v) => v !== true);
};
export const useInput = (parameters = {}) => {
	const {
		initialValue,
		disabled = false,
		error = false,
		onBlur,
		onChange,
		onFocus,
		rules = [],
		required: requiredProp = false,
	} = parameters;

	const inputRef = useRef(null);
	const [value, setValue] = useState(initialValue);
	const [dirty, setDirty] = useState(false);
	const [errors, setErrors] = useState(validation(value, rules));

	return {
		value,
		dirty,
		errors,
		onBlur: (e) => {
			setDirty(true);
		},
		onChange: ({ target }) => {
			setValue(target.value);
			setErrors(validation(target.value, rules));
		},
	};
};
