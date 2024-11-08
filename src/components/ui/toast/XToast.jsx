import classNames from 'classnames';
import { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { XMessages } from '../messages';
import './style.scss';
import { XToastContext } from './XToastContext';

export const XToast = memo(
	forwardRef(
		({ position = 'right-top', underlined, life, closable, color, outline }, ref) => {
			const containerRef = useRef(null);
			const mesgs = useRef(null);
			const under = useMemo(() => {
				if (!underlined) {
					return undefined;
				}
				const p = position.split('-');
				if (p[0] === 'left') {
					return 'right';
				} else if (p[0] === 'right') {
					return 'left';
				} else if (p[1] === 'top') {
					return 'top';
				} else if (p[1] === 'bottom') {
					return 'bottom';
				}
				return undefined;
			}, [position, underlined]);
			const show = (message) => {
				mesgs.current?.show(message);
			};
			const replace = (message) => {
				mesgs.current?.replace(message);
			};
			const clear = () => {
				mesgs.current?.clear();
			};
			useImperativeHandle(ref, () => ({
				show,
				replace,
				clear,
				getElement: () => containerRef.current,
			}));
			useEffect(() => console.log(under), [under]);
			return createPortal(
				<div
					className={classNames('x-toast', {
						[`x-toast--${position}`]: position,
					})}
					ref={containerRef}
				>
					<XToastContext.Provider
						value={{ underlined: under, show, replace, clear }}
					>
						<XMessages
							life={Math.max(life ?? 0, 3000)}
							closable={closable}
							color={color}
							outline={outline}
							underlined={underlined}
							sticky={false}
							ref={mesgs}
						/>
					</XToastContext.Provider>
				</div>,
				document.body,
			);
		},
	),
);
