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
	breakpoint = null,
	mini = false,
	miniToOverlay = false,
	miniMouse = false,
	miniToggle = false,

	resizeable = false,
	w = null,
	mW = null,
	onResize = () => {},
	onMini = () => {},
	onToggle = () => {},
	...props
}) {
	/*const props = XSidebarBase.getProps(inProps, {});
    const {children, className, type, mini, miniToOverlay, open, overlay, breakpoint, onMouseEnter, onMouseLeave, onResize, onMini, onToggle } = props;*/

	const { $layout, $update } = useContext(XLayoutContext) || {};

	const [width, setWidth] = useState(w);
	const [miniWidth, setMiniWidth] = useState(mW);
	const [isOpenBreakpoint, setOpenBreakpoint] = useState(false);

	const belowBreakpoint = useMemo(
		() => (breakpoint && $layout.width < breakpoint) || false,
		[$layout, breakpoint],
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

	const isResizeable = useMemo(
		() => resizeable && !miniToggle && !isMouseEvent && !isMini && !belowBreakpoint,
		[resizeable, miniToggle, isMouseEvent, isMini, belowBreakpoint],
	);

	const onMouseEnter = () => {
		isMouseEvent && onMini(false);
	};
	const onMouseLeave = () => {
		isMouseEvent && onMini(true);
	};

	useEffect(() => {
		setOpenBreakpoint(false);
	}, [belowBreakpoint]);

	useEffect(() => {
		setOpenBreakpoint((v) => !v);
	}, [open]);

	const containerStyle = useMemo(
		() => ({
			minWidth: isOpen ? '' : 0,
			width:
				isOpen && isMini
					? miniWidth
					: isOpen && (isResizeable || (!!width && !isMiniToOverlay))
						? width
						: '',
		}),
		[width, miniWidth, isMini, isOpen, isMiniToOverlay, isResizeable],
	);
	const style = useMemo(
		() => ({ width: isOpen && isResizeable ? width : '' }),
		[width, isOpen, isResizeable],
	);

	const ref = useRef(null);

	const handleDrag = useCallback((e, ui) => {
		setWidth((width) => width + ui.deltaX);
		/*const { direction } = this.props;
		const factor = direction === 'e' || direction === 's' ? -1 : 1;

		// modify the size based on the drag delta
		let delta = this.isHorizontal() ? ui.deltaX : ui.deltaY;
		this.setState((s, p) => ({ size: Math.max(10, s.size - delta * factor) }));*/
	}, []);

	const handleDragEnd = useCallback((e, ui) => {
		setWidth(ref.current.getBoundingClientRect().width);
	}, []);

	return (
		<XSidebarContext.Provider value={{ width, isMini, isOpen }}>
			<div
				className={classNames('xSidebar-container', {
					'xLayout-sidebar': !!$layout,
					[`xLayout-sidebar--${type}`]: !!$layout && !!type,
					[`xSidebar--${type}`]: !!type,
					'xSidebar--overlay': isOverlay,
					'xSidebar--close': !isOpen,
					'xSidebar--mini': isMini,
					'xSidebar--mini-overlay': isMiniToOverlay,
				})}
				style={containerStyle}
			>
				<div
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					className={classNames('xSidebar', {
						'xSidebar--toggle': miniToggle,
						[`xSidebar--${type}`]: !!type,
					})}
					style={style}
					ref={ref}
				>
					<div {...props} className={classNames('xSidebar-content', className)}>
						{children}
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
					{isResizeable && (
						<DraggableCore onDrag={handleDrag} onStop={handleDragEnd}>
							<div className="xSidebar-res"></div>
						</DraggableCore>
					)}
				</div>
			</div>
		</XSidebarContext.Provider>
	);
}
