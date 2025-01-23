import classNames from 'classnames';
import { forwardRef, memo, useCallback, useMemo } from 'react';
import { isString } from '../../../utils/is';
import { useId } from '../../hooks/useId';
import { useTimeout } from '../../hooks/useTimeout';
import { XBtn } from '../btn';
import { XIcon } from '../icon';
import { useXMessagesContext } from '../messages/XMessagesContext';
import { XSpinner } from '../spinner';
import { useXToastContext } from '../toast/XToastContext';
import './style.css';

export const XMessage = memo(
	forwardRef(
		(
			{
				id,
				_pId,
				className,
				children,
				label,
				description,
				icon,
				tonal,
				color,
				outline,
				square,
				underlined,
				filled,
				closable,
				loading,
				life = 3000,
				sticky,
			},
			ref,
		) => {
			const uid = useId(id);
			const Icon = useMemo(() => {
				if (icon?.type === XIcon) {
					return icon;
				} else if (isString(icon)) {
					return <XIcon>{icon}</XIcon>;
				}
			}, [icon]);

			const toast = useXToastContext();
			const context = useXMessagesContext();
			const isClosable = true;
			/*const isClosable = useMemo(
				() => (closable || sticky) && context,
				[closable, context],
			);*/
			const handleClose = useCallback((event) => {
				clearTimer();
				context?.remove(_pId);
				if (event) {
					event.preventDefault();
					event.stopPropagation();
				}
			}, []);
			const [clearTimer] = useTimeout(
				() => {
					handleClose(null);
				},
				life,
				!sticky,
			);
			const under = useMemo(
				() => toast?.underlined || underlined,
				[toast, underlined],
			);
			return (
				<div
					id={uid}
					role="alert"
					aria-live={toast ? 'assertive' : 'polite'}
					aria-atomic="true"
					className={classNames(
						'x-message',
						{
							[`x-message--${color}`]: color,
							'x-message--square': square,
							'x-message--outline': outline,
							'x-message--filled': filled,
							'x-message--tonal': tonal,
							[`x-message--underlined-${under}`]: under,
						},
						className,
					)}
					ref={ref}
				>
					<div className="x-message__underlay" />
					<div className="x-message__outline" />
					{icon && !loading && Icon}
					{loading && <XSpinner thickness="5" />}
					<div className="x-message__body">
						<div className="x-message__label">{label}</div>
						<div className="x-message__description">
							{children ?? description}
						</div>
					</div>
					{isClosable && (
						<div className="x-message__close">
							<XBtn
								leftSection="mdi-close"
								size="sm"
								flat
								plain
								onClick={handleClose}
							/>
						</div>
					)}
				</div>
			);
		},
	),
);
