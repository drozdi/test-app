import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { useId } from '../../hooks/useId';
import { XInputControlProvider } from './XInputControlContext';
import './style.css';

export const XInputControl = forwardRef(function XInputControlFn(
	{ id, className, children, ...props },
	ref,
) {
	const uid = useId(id);
	const context = {
		inputId: `${uid}-input`,
		labelId: `${uid}-label`,
		errorId: `${uid}-error`,
		hintId: `${uid}-hint`,
	};
	return <XInputControlProvider value={context}>{children}</XInputControlProvider>;
});

XInputControl.propTypes = {
	id: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
};
