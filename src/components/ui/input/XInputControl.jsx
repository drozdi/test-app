import PropTypes from 'prop-types';
import { useId } from '../../hooks/useId';
import { XInputControlProvider } from './XInputControlContext';
import './style.css';

export function XInputControl({ id, className, children, ...props }) {
	const uid = useId(id);
	const context = {
		inputId: `${uid}-input`,
		labelId: `${uid}-label`,
		errorId: `${uid}-error`,
		hintId: `${uid}-hint`,
	};
	return <XInputControlProvider value={context}>{children}</XInputControlProvider>;
}

XInputError.propTypes = {
	id: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
};
