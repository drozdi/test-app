import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';
import './style.css';
import { useXAccordionContext } from './XAccordionContext';
export function XAccordionTab({
	className,
	children,
	header,
	disabled,
	value,
	onClick,
	...props
}) {
	const [expanded, setExpanded] = useState(false);

	const ctx = useXAccordionContext();
	const isActive = ctx?.isItemActive(value);
	const toggleExpanded = (e) => {
		ctx || setExpanded((v) => !v);
	};

	const handleClick = (event) => {
		onClick?.(event);
		ctx?.onChange?.(value);
		toggleExpanded(event);
	};
	return (
		<div
			{...props}
			className={classNames('x-accordion-tab', {
				'x-accordion-tab--expanded': expanded,
			})}
		>
			<div
				className="x-accordion-header"
				role="button"
				disabled={disabled}
				aria-expanded={isActive}
				onClick={handleClick}
			>
				<div>{header}</div>
				<div>
					<i className="x-accordion-header-icon"></i>
				</div>
			</div>
			<div className="x-accordion-content">{children}</div>
		</div>
	);
}

XAccordionTab.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	header: PropTypes.string,
};
