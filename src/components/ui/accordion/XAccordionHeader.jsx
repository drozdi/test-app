import PropTypes from 'prop-types';
import { XChevron } from '../icon';
import './style.css';

import classNames from 'classnames';
import { useXAccordionTabContext } from './XAccordionTabContext';
export function XAccordionHeader({ className, children, onClick, ...props }) {
	const {
		value,
		active,
		disabled,
		toggleExpanded,
		getHeaderId,
		getPanelId,
		onKeyDown,
	} = useXAccordionTabContext();

	const handleClick = (event) => {
		if (disabled) {
			return;
		}
		onClick?.({ ...event, value });
		toggleExpanded(value);
	};
	const handleKeyDown = (event) => {
		event.value = value;
		onKeyDown(event);
	};

	return (
		<button
			{...props}
			id={getHeaderId(value)}
			className={classNames('x-accordion-control', className)}
			role="button"
			disabled={disabled}
			aria-disabled={disabled}
			aria-expanded={active}
			aria-controls={getPanelId(value)}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			<span>{children}</span>
			<span>
				<XChevron className="x-accordion-chevron" />
			</span>
		</button>
	);
}

XAccordionHeader.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	/*header: PropTypes.string,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,*/
};
