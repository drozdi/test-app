import classNames from 'classnames';
import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { XLayoutContext } from '../layout/XLayoutContext';

import { DraggableCore } from 'react-draggable';
import { XBtn } from '../btn/XBtn';
import './XSidebar.scss';
import { XSidebarContext } from './XSidebarContext';

export function XSidebar({
	children,
	className,
	type = 'left',
	open = false,
	overlay = false,
	w = null,
	breakpoint = null,
	mini = false,
	miniToOverlay = false,
	miniMouse = false,
	miniToggle = false,
	miniW = null,

	resizeable = false,

	onResize = () => {},
	onMini = () => {},
	onToggle = () => {},
	...props
}) {
	/*const props = XSidebarBase.getProps(inProps, {});
    const {children, className, type, mini, miniToOverlay, open, overlay, breakpoint, onMouseEnter, onMouseLeave, onResize, onMini, onToggle } = props;*/

	const { $layout } = useContext(XLayoutContext) || {};

	const isLayout = useMemo(() => !!$layout, [$layout]);

	const [width, setWidth] = useState(w);
	const [miniWidth, setMiniWidth] = useState(miniW);
	const [isOpenBreakpoint, setOpenBreakpoint] = useState(false);

	const belowBreakpoint = useMemo(
		() => (breakpoint && $layout.width < breakpoint) || false,
		[$layout.width, breakpoint],
	);

	const isOpen = useMemo(
		() => (belowBreakpoint ? isOpenBreakpoint : open),
		[open, belowBreakpoint, isOpenBreakpoint],
	);

	const isMini = useMemo(() => mini && !belowBreakpoint, [mini, belowBreakpoint]);

	const isOverlay = useMemo(
		() =>
			!belowBreakpoint && open && ((mini && overlay) || miniToOverlay)
				? false
				: overlay || miniToOverlay,
		[overlay, mini, open, miniToOverlay, belowBreakpoint],
	);

	const isMiniToOverlay = useMemo(
		() => (miniToOverlay || overlay) && !belowBreakpoint,
		[miniToOverlay, overlay, belowBreakpoint],
	);

	const isMouseEvent = useMemo(() => miniMouse && !miniToggle, [miniToggle, miniMouse]);

	const canResized = useMemo(
		() => resizeable && !miniToggle && !isMouseEvent && !isMini && !belowBreakpoint,
		[resizeable, miniToggle, isMouseEvent, isMini, belowBreakpoint],
	);

	const onMouseEnter = () => {
		isMouseEvent && onMini(false);
	};
	const onMouseLeave = () => {
		isMouseEvent && onMini(true);
	};

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
		[width, miniWidth, isMini, isOpen, isMiniToOverlay, canResized],
	);
	const style = useMemo(
		() => ({ width: isOpen && canResized ? width : '' }),
		[width, isOpen, canResized],
	);

	const reverse = useMemo(() => type === 'right', [type]);
	const containerRef = useRef(null);
	const handleDrag = useCallback(
		(e, ui) => setWidth((width) => width + (reverse ? -ui.deltaX : ui.deltaX)),
		[reverse],
	);
	const handleDragEnd = useCallback(
		(e, ui) => setWidth(containerRef.current.getBoundingClientRect().width),
		[],
	);

	useEffect(() => {
		if (containerRef.current) {
			setTimeout(() => {
				const style = window.getComputedStyle(containerRef.current);
				const width = parseInt(style.width || 0, 10) || 0;
				const minWidth = parseInt(style.minWidth || 0, 10) || 0;
				setWidth(width);
				setMiniWidth(minWidth);
				setOpenBreakpoint(() => !belowBreakpoint);
			}, 0);
		}
	}, [belowBreakpoint, containerRef]);

	useEffect(() => {
		setOpenBreakpoint((v) => !v);
	}, [open]);

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
				>
					<div {...props} className={classNames('xSidebar-content', className)}>
						{children}
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
						isOpenBreakpoint: {isOpenBreakpoint ? 'true' : 'false'}
						<br />
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
						<DraggableCore onDrag={handleDrag} onStop={handleDragEnd}>
							<div className="xSidebar-res"></div>
						</DraggableCore>
					)}
				</div>
			</div>
		</XSidebarContext.Provider>
	);
}
