import classNames from 'classnames';
import { isString } from '../../../utils/is';
import { XIcon } from '../icon';
import './styles.css';
import { useXTabsContext } from './XTabsContext';
export function XTabsTab({
	className,
	children,
	rightSection,
	leftSection,
	value,
	color,
	disabled,
	tabIndex = 0,
	onClick,
	onKeyDown,
	...props
}) {
	const ctx = useXTabsContext();
	const active = ctx.isActive(value);
	const handleClick = (event) => {
		event.preventDefault();
		if (disabled) {
			return;
		}
		onClick?.({ ...event, value });
		ctx.setActiveTab(value);
	};

	/*if (!ctx?.value) {
		ctx?.setActiveTab?.(value);
	}*/

	return (
		<button
			role="tab"
			aria-selected={active}
			aria-disabled={disabled}
			disabled={disabled}
			tabIndex={disabled ? -1 : tabIndex}
			className={classNames('x-tabs-tab', {
				'x-tabs-tab--disabled': disabled,
				'x-tabs-tab--active': active,
				[`text-${color}`]: color,
				className,
			})}
			onClick={handleClick}
		>
			{leftSection && (
				<span className="x-tabs-tab__section">
					{isString(leftSection) ? <XIcon>{leftSection}</XIcon> : leftSection}
				</span>
			)}
			<span className="x-tabs-tab__label">{children}</span>
			<div className="x-tabs-tab__underlay"></div>
			{leftSection && (
				<span className="x-tabs-tab__section">
					{isString(rightSection) ? (
						<XIcon>{rightSection}</XIcon>
					) : (
						rightSection
					)}
				</span>
			)}
		</button>
	);
}
