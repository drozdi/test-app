import classNames from 'classnames';
import { forwardRef, useCallback, useMemo, useRef } from 'react';
import { isString } from '../../../utils/is';
import { XBtn } from '../btn';
import { XIcon } from '../icon';
import './style.scss';
import { useXMessagesContext } from './XMessagesContext';

export const XMessage = forwardRef(function XMessage(
	{ id, className, icon, color, children, style, outline, square, underlined, onClose },
	ref,
) {
	const context = useXMessagesContext();
	const canClose = true;
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

	const handleClose = useCallback(
		(event) => {
			onClose && onClose({ id });
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}
		},
		[onClose],
	);

	return (
		<div
			{...attrs}
			className={classNames('x-message', {
				[`x-message--${color}`]: color,
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
			{canClose && (
				<div className="x-message__close">
					<XBtn
						icon="mdi-close"
						size="xs"
						flat={true}
						plain={true}
						onClick={handleClose}
					/>
				</div>
			)}
		</div>
	);
});
