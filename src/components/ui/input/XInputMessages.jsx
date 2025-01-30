import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useXInputControlContext } from './XInputControlContext';
import './style.css';

export function XInputMessages({ id, className, children, ...props }) {
	const ctx = useXInputControlContext();

	return (
		!hideMessage && (
			<div
				className={classNames('x-input-messages', {
					'x-input-messages--hint': !isError && !hideHint,
					'x-input-messages--error': isError,
				})}
				role="alert"
				aria-live="polite"
			>
				{children}
			</div>
		)
	);
}

XInputDescription.propTypes = {
	id: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
};
