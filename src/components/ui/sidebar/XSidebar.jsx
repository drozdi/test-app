import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, {
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import { DraggableCore } from 'react-draggable';
import { XBtn } from '../btn/XBtn';
import { XLayoutContext } from '../layout';
import './XSidebar.scss';
import { XSidebarContext } from './XSidebarContext';

const XSidebarRoot = forwardRef(function XSidebarRoot(
	{
		children,
		className,

		type,
		breakpoint,
		mini,
		miniOverlay,
		miniToggle,
		miniMouse,
		miniW,
		open,
		overlay,
		toggle,

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

	const [innerMini, setInnerMini] = useState(mini);

	const reverse = useMemo(() => type === 'right', [type]);
	const belowBreakpoint = useMemo(
		() => (breakpoint && isLayout && $layout?.width < breakpoint) || false,
		[$layout, breakpoint, isLayout],
	);
	const innerEvents = useMemo(
		() => !belowBreakpoint && (miniMouse || miniToggle),
		[belowBreakpoint, miniMouse, miniToggle],
	);
	const isMouseEvent = useMemo(
		() => !belowBreakpoint && miniMouse && !miniToggle,
		[belowBreakpoint, miniMouse, miniToggle],
	);

	const isOpen = useMemo(
		() => (belowBreakpoint ? isOpenBreakpoint : open),
		[belowBreakpoint, isOpenBreakpoint, open],
	);
	const isMini = useMemo(
		() => (innerEvents ? innerMini : mini && !belowBreakpoint),
		[innerEvents, innerMini, mini, belowBreakpoint],
	);

	/*const isOverlay = useMemo(
		() =>
			!belowBreakpoint && open && ((mini && overlay) || miniOverlay)
				? false
				: overlay || miniOverlay,
		[mini, overlay, miniOverlay, open],
	);*/

	const isOverlay = useMemo(
		() => overlay || (belowBreakpoint && miniOverlay) || false,
		[overlay, belowBreakpoint, miniOverlay, open],
	);

	const isMiniOverlay = useMemo(
		() => (miniOverlay || (innerEvents && overlay)) && !belowBreakpoint,
		[miniOverlay, innerEvents, overlay, belowBreakpoint],
	);

	const canResized = useMemo(
		() => resizeable && !innerEvents && !isMini && !belowBreakpoint,
		[resizeable, innerEvents, isMini, belowBreakpoint],
	);
	// # todo: belowBreakpoint isOverlay
	const containerStyle = useMemo(
		() => ({
			/*minWidth: isOpen && !belowBreakpoint ? '' : 0,
			width:
				isOpen && isMini
					? miniWidth
					: !belowBreakpoint &&
						  isOpen &&
						  (canResized || (!!width && !isMiniOverlay))
						? width
						: '',*/
		}),
		[width, isOpen, isMini, canResized, miniWidth, isMiniOverlay],
	);

	const style = useMemo(
		() => ({
			//width: isOpen && !isMini ? width : '',
		}),
		[width, isOpen, isMini],
	);

	useEffect(() => {
		if (containerRef.current) {
			const style = window.getComputedStyle(containerRef.current);
			const w = parseInt(style.width || 0, 10) || 0;
			const minWidth = parseInt(style.minWidth || 0, 10) || 0;
			!width && setWidth(w);
			!miniWidth && setMiniWidth(minWidth);
		}
	}, [containerRef.current]);
	useEffect(() => setOpenBreakpoint((v) => !v), [open]);
	useEffect(() => setOpenBreakpoint(false), [belowBreakpoint]);

	useEffect(() => {
		const handleClose = ({ target }) => {
			if (target.closest('.xSidebar-container') !== containerRef.current) {
				setInnerMini(true);
				setOpenBreakpoint(false);
			}
		};
		if (miniMouse && (miniToggle || belowBreakpoint)) {
			document.addEventListener('click', handleClose);
		}
		return () => {
			document.removeEventListener('click', handleClose);
		};
	}, [miniMouse, miniToggle, belowBreakpoint]);

	useEffect(() => onMini(isMini), [isMini]);

	const onHandleDrag = useCallback(
		(e, ui) => {
			setWidth((w) => w + (reverse ? -ui.deltaX : ui.deltaX));
		},
		[reverse],
	);
	const onHandleDragEnd = useCallback(
		(e, ui) => {
			const width = containerRef.current?.getBoundingClientRect().width;
			setWidth(width);
			onResize(width);
		},
		[containerRef.current],
	);
	const onMouseEnter = useCallback(
		(e) => {
			isMouseEvent && setInnerMini(false);
		},
		[isMouseEvent],
	);
	const onMouseLeave = useCallback(
		(e) => {
			isMouseEvent && setInnerMini(true);
		},
		[isMouseEvent],
	);

	const onHandleToggle = useCallback(() => {
		if (
			false ===
			onToggle({
				width,
				isOpen,
				isMini,
			})
		) {
			return;
		}
		if (belowBreakpoint) {
			setOpenBreakpoint((v) => !v);
		} else {
			setInnerMini((m) => !m);
		}
	}, [onToggle]);

	////
	//useEffect(() => console.log(width), [width]);
	//useEffect(() => console.log(miniWidth), [miniWidth]);
	return (
		<XSidebarContext.Provider value={{ width, isMini, isOpen }}>
			<div
				className={classNames('xSidebar-container', {
					'xLayout-sidebar': isLayout,
					[`xLayout-sidebar--${type}`]: isLayout && !!type,
					'xSidebar--animate': !canResized,
				})}
				style={containerStyle}
				ref={containerRef}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				<div
					className={classNames('xSidebar', {
						[`xSidebar--${type}`]: !!type,
						'xSidebar--toggle': miniToggle,
						'xSidebar--mini': isMini,
						'xSidebar--close': !isOpen,
						'xSidebar--animate': !canResized,
						'xSidebar--overlay': isOverlay,
						'xSidebar--mini-overlay': isMiniOverlay,
					})}
					style={style}
					ref={ref}
				>
					<div className={classNames('xSidebar-content', className)}>
						{children}
					</div>
					{miniToggle && !belowBreakpoint && (
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
								onClick={onHandleToggle}
								className="text-2xl py-0"
								title={isMini ? 'Развернуть' : 'Свернуть'}
							/>
						</div>
					)}
					{toggle && belowBreakpoint && (
						<div className="xSidebar-toggle">
							<XBtn
								color="dimmed"
								block={true}
								square={true}
								icon={
									isOpen
										? `mdi-arrow-${type}-bold-box-outline`
										: `mdi-arrow-${type === 'left' ? 'right' : 'left'}-bold-box-outline`
								}
								onClick={onHandleToggle}
								className="text-2xl py-0"
								title={isOpen ? 'Свернуть' : 'Развернуть'}
							/>
						</div>
					)}
					{canResized && (
						<DraggableCore onDrag={onHandleDrag} onStop={onHandleDragEnd}>
							<div className="xSidebar-res"></div>
						</DraggableCore>
					)}
				</div>
				{true && (
					<div className="fixed bg-black/50 text-white right-0 top-12 p-4">
						breakpoint: {breakpoint}
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
						isOpenBreakpoint: {isOpenBreakpoint ? 'true' : 'false'}
						<br />
						canResized: {canResized ? 'true' : 'false'}
						<br />
						innerEvents: {innerEvents ? 'true' : 'false'}
						<br />
						isMouseEvent: {isMouseEvent ? 'true' : 'false'}
						<br />
						width: {width}
						<br />
						miniWidth: {miniWidth}
						<br />
						containerStyle: {JSON.stringify(containerStyle)}
						<br />
						style: {JSON.stringify(style)}
						<br />
					</div>
				)}
			</div>
		</XSidebarContext.Provider>
	);
});

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
	toggle: PropTypes.bool,
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
	w: 256,
	type: 'left',
	mini: false,
	miniOverlay: false,
	miniToggle: false,
	miniMouse: false,
	miniW: undefined,
	open: false,
	overlay: false,
	toggle: false,

	breakpoint: null,
	resizeable: false,
	onResize: () => {},
	onMini: () => {},
	onToggle: () => {},
};

export const XSidebar = XSidebarRoot;
