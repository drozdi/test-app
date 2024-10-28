import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, {
	forwardRef,
	memo,
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { matchesSelectorToParentElements } from '../../../utils/domFns';

import { DraggableCore } from 'react-draggable';
import { XBtn } from '../btn/XBtn';
import { XLayoutContext } from '../layout';
import './XSidebar.scss';
import { XSidebarContext } from './XSidebarContext';

export const XSidebar = memo(
	forwardRef(function XSidebar(
		{
			children,
			className,

			type,
			mini,
			miniToOverlay,
			miniToggle,
			miniMouse,
			miniW,
			open,
			overlay,
			breakpoint,
			resizeable,
			w,

			onResize,
			onMini,
			onToggle,
		},
		ref,
	) {
		const { $layout, $update } = useContext(XLayoutContext);

		const isLayout = useMemo(() => !!$layout, [$layout]);
		const containerRef = useRef(null);

		const [width, setWidth] = useState(w);
		const [miniWidth, setMiniWidth] = useState(miniW);
		const [isOpenBreakpoint, setOpenBreakpoint] = useState(false);

		const reverse = useMemo(() => type === 'right', [type]);

		const belowBreakpoint = useMemo(
			() => (breakpoint && isLayout && $layout?.width < breakpoint) || false,
			[$layout, breakpoint, isLayout],
		);

		const isOpen = useMemo(
			() => (belowBreakpoint ? isOpenBreakpoint : open),
			[belowBreakpoint, isOpenBreakpoint, open],
		);

		const isMini = useMemo(() => mini && !belowBreakpoint, [mini, belowBreakpoint]);

		const isOverlay = useMemo(
			() =>
				!belowBreakpoint && open && ((mini && overlay) || miniToOverlay)
					? false
					: overlay || miniToOverlay,
			[mini, overlay, miniToOverlay, open],
		);

		const isMiniToOverlay = useMemo(
			() => (miniToOverlay || overlay) && !belowBreakpoint,
			[miniToOverlay, overlay, belowBreakpoint],
		);

		const isMouseEvent = useMemo(
			() => miniMouse && !miniToggle,
			[miniMouse, miniToggle],
		);

		const canResized = useMemo(
			() =>
				resizeable && !miniToggle && !isMouseEvent && !isMini && !belowBreakpoint,
			[resizeable, miniToggle, isMouseEvent, isMini, belowBreakpoint],
		);

		const containerStyle = useMemo(
			() => ({
				minWidth: isOpen ? '' : 0,
				width:
					isOpen && isMini
						? miniWidth
						: isOpen && (canResized || (!!width && !isMiniToOverlay))
							? width
							: '',
			}),
			[width, isOpen, isMini, canResized, miniWidth, isMiniToOverlay],
		);

		const style = useMemo(
			() => ({ width: isOpen && !isMini ? width : '' }),
			[width, isOpen, isMini],
		);

		useLayoutEffect(() => {
			if (containerRef.current) {
				const style = window.getComputedStyle(containerRef.current);
				const minWidth = parseInt(style.minWidth || 0, 10) || 0;
				!miniWidth && setMiniWidth(minWidth);
			}
		}, [containerRef.current]);
		useEffect(() => setOpenBreakpoint(false), [belowBreakpoint]);
		useEffect(() => setOpenBreakpoint((v) => !v), [open]);

		useEffect(() => {
			const handleClose = ({ target }) => {
				if (
					!matchesSelectorToParentElements(
						target,
						'.xSidebar',
						containerRef.current,
					)
				) {
					onMini(true);
				}
			};
			if (miniMouse && miniToggle) {
				document.addEventListener('click', handleClose);
			}
			return () => {
				document.removeEventListener('click', handleClose);
			};
		}, [miniMouse, miniToggle]);

		const onHandleDrag = useCallback(
			(e, ui) => {
				setWidth((w) => w + (reverse ? -ui.deltaX : ui.deltaX));
			},
			[reverse],
		);
		const onHandleDragEnd = useCallback(
			(e, ui) => {
				setWidth(containerRef.current?.getBoundingClientRect().width);
			},
			[containerRef.current],
		);
		const onMouseEnter = useCallback(() => {
			isMouseEvent && onMini(false);
		}, [isMouseEvent]);
		const onMouseLeave = useCallback(() => {
			isMouseEvent && onMini(true);
		}, [isMouseEvent]);

		return (
			<XSidebarContext.Provider value={{ width, isMini, isOpen }}>
				<div
					className={classNames('xSidebar-container', {
						'xLayout-sidebar': isLayout,
						[`xLayout-sidebar--${type}`]: isLayout && !!type,
						[`xSidebar--${type}`]: !!type,
						'xSidebar--overlay': isOverlay,
						'xSidebar--close': !isOpen,
						'xSidebar--mini': isMini,
						'xSidebar--mini-overlay': isMiniToOverlay,
						'xSidebar--animate': !canResized,
					})}
					style={containerStyle}
					ref={containerRef}
				>
					<div
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
						className={classNames('xSidebar', {
							'xSidebar--toggle': miniToggle,
							[`xSidebar--${type}`]: !!type,
							'xSidebar--animate': !canResized,
						})}
						style={style}
						ref={ref}
					>
						<div className={classNames('xSidebar-content', className)}>
							{children}
							{false && (
								<>
									<br />
									isOpen: {isOpen ? 'true' : 'false'}
									<br />
									isMini: {isMini ? 'true' : 'false'}
									<br />
									isOverlay: {isOverlay ? 'true' : 'false'}
									<br />
									isMiniToOverlay: {isMiniToOverlay ? 'true' : 'false'}
									<br />
									belowBreakpoint: {belowBreakpoint ? 'true' : 'false'}
									<br />
									isOpenBreakpoint:{' '}
									{isOpenBreakpoint ? 'true' : 'false'}
									<br />
								</>
							)}
						</div>
						{miniToggle && (
							<div className="xSidebar-toggle">
								<XBtn
									color="dimmed"
									block={true}
									square={true}
									icon={
										isMini
											? `mdi-arrow-${type === 'left' ? 'right' : 'left'}-bold-box-outline`
											: `mdi-arrow-${type}-bold-box-outline`
									}
									onClick={() => onMini(!mini)}
									className="text-2xl py-0"
								/>
							</div>
						)}
						{canResized && (
							<DraggableCore onDrag={onHandleDrag} onStop={onHandleDragEnd}>
								<div className="xSidebar-res"></div>
							</DraggableCore>
						)}
					</div>
				</div>
			</XSidebarContext.Provider>
		);
	}),
);
XSidebar.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	type: PropTypes.string,
	mini: PropTypes.bool,
	miniToOverlay: PropTypes.bool,
	miniToggle: PropTypes.bool,
	miniMouse: PropTypes.bool,
	miniW: PropTypes.number,
	open: PropTypes.bool,
	overlay: PropTypes.bool,
	breakpoint: PropTypes.number,

	w: PropTypes.number,

	resizeable: PropTypes.bool,

	onResize: PropTypes.func,
	onMini: PropTypes.func,
	onToggle: PropTypes.func,
};
XSidebar.defaultProps = {
	children: '',
	className: '',

	type: 'left',
	mini: false,
	miniToOverlay: false,
	miniToggle: false,
	miniMouse: false,
	miniW: undefined,
	open: false,
	overlay: false,
	breakpoint: null,
	resizeable: false,
	w: 300,

	onResize: () => {},
	onMini: () => {},
	onToggle: () => {},
};
