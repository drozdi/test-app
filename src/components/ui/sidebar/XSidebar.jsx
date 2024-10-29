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

import { DraggableCore } from 'react-draggable';
import { XBtn } from '../btn/XBtn';
import { XLayoutContext } from '../layout';
import './XSidebar.scss';
import { XSidebarContext } from './XSidebarContext';

function XSidebarRoot(
	{
		children,
		className,

		type,
		mini,
		miniOverlay,
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
			!belowBreakpoint && open && ((mini && overlay) || miniOverlay)
				? false
				: overlay || miniOverlay,
		[mini, overlay, miniOverlay, open],
	);

	const isMiniOverlay = useMemo(
		() => (miniOverlay || overlay) && !belowBreakpoint,
		[miniOverlay, overlay, belowBreakpoint],
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
					: isOpen && (canResized || (!!width && !isMiniOverlay))
						? width
						: '',
		}),
		[width, isOpen, isMini, canResized, miniWidth, isMiniOverlay],
	);

	const style = useMemo(
		() => ({ width: isOpen && !isMini ? width : '' }),
		[width, isOpen, isMini],
	);

	useLayoutEffect(() => {
		if (containerRef.current) {
			const style = window.getComputedStyle(containerRef.current);
			const w = parseInt(style.width || 0, 10) || 0;
			const minWidth = parseInt(style.minWidth || 0, 10) || 0;
			!width && setWidth(w);
			!miniWidth && setMiniWidth(minWidth);
		}
	}, [containerRef.current]);
	useEffect(() => setOpenBreakpoint(false), [belowBreakpoint]);
	useEffect(() => setOpenBreakpoint((v) => !v), [open]);
	useEffect(() => console.log(width), [width]);
	useEffect(() => console.log(miniWidth), [miniWidth]);
	useEffect(() => {
		const handleClose = ({ target }) => {
			if (target.closest('.xSidebar-container') !== containerRef.current) {
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
	const onMouseEnter = useCallback((e) => {
		console.log(isMouseEvent, e);
		isMouseEvent && onMini(false);
	}, [isMouseEvent]);
	const onMouseLeave = useCallback((e) => {
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
					'xSidebar--mini-overlay': isMiniOverlay,
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
						{true && (
							<>
								<br />
								isOpen: {isOpen ? 'true' : 'false'}
								<br />
								isMini: {isMini ? 'true' : 'false'}
								<br />
								isOverlay: {isOverlay ? 'true' : 'false'}
								<br />
								isMiniOverlay: {isMiniOverlay ? 'true' : 'false'}
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
								title={isMini? 'Развернуть' : 'Свернуть'}
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
}

export const XSidebar = memo(
	forwardRef(XSidebarRoot),
);
XSidebarRoot.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	type: PropTypes.string,
	mini: PropTypes.bool,
	miniOverlay: PropTypes.bool,
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
XSidebarRoot.defaultProps = {
	children: '',
	className: '',

	type: 'left',
	mini: false,
	miniOverlay: false,
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
