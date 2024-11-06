import classNames from 'classnames';
import { forwardRef, useMemo, useRef } from 'react';
import { isString } from '../../../utils/is';
import { XBtn } from '../btn';
import { XIcon } from '../icon';
import './style.scss';
export const XMessage = forwardRef(function XMessage(
	{ id, className, icon, type, children, style, outline, square, underlined },
	ref,
) {
	const elementRef = useRef(null);
	const Icon = useMemo(() => {
		if (icon?.type === XIcon) {
			return icon;
		} else if (isString(icon)) {
			return <XIcon>{icon}</XIcon>;
		}
	}, [icon]);

	const attrs = useMemo(
		() => ({
			id,
			style,
			role: 'alert',
			'aria-live': 'polite',
			'aria-atomic': 'true',
		}),
		[style],
	);

	return (
		<div
			{...attrs}
			className={classNames('x-message', {
				[`x-message--${type}`]: type,
				'x-message--square': square,
				'x-message--outline': outline,
				[`x-message--underlined-${underlined}`]: underlined,
			})}
			ref={elementRef}
		>
			<div className="x-message__backdor" />
			<div className="x-message__outline" />
			<div className={classNames('x-message__content', className)}>
				{Icon}
				{children}
			</div>
			<div className="x-message__close">
				<XBtn icon="mdi-close" flat={true} size="xs" plain={true} />
			</div>
		</div>
	);
});
