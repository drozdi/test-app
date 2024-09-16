import classNames from 'classnames';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useResizeObserver } from '../../../hooks/useResizeObserver';
import { XLayoutContext } from '../layout/XLayoutContext';

import './XSidebar.scss';

import { XBtn } from '../btn/XBtn';
import { XSidebarContext } from './XSidebarContext';

export function XSidebar({
	children,
	className,
	type = 'left',
	mini = false,
	miniToOverlay = false,
	open = false,
	overlay = false,
	toggle = false,
	breakpoint = null,

	resizeable = false,

	w = null,

	onResize = () => {},
	onMini = () => {},
	onToggle = () => {},
	...props
}) {
	/*const props = XSidebarBase.getProps(inProps, {});
    const {children, className, type, mini, miniToOverlay, open, overlay, breakpoint, onMouseEnter, onMouseLeave, onResize, onMini, onToggle } = props;*/

	const { $layout, $update } = useContext(XLayoutContext) || {};

	const [width, setWidth] = useState(w);

	const containerRef = useResizeObserver((target, entry) => {
		onResize(target.offsetWidth);
		//$layout && $update(type, 'size', target.offsetWidth);
	});

	const belowBreakpoint = useMemo(
		() => (breakpoint && $layout.width < breakpoint) || false,
		[$layout, breakpoint],
	);

	const [isOpenBreakpoint, setOpenBreakpoint] = useState(false);

	useEffect(() => {
		setOpenBreakpoint(false);
	}, [belowBreakpoint]);

	useEffect(() => {
		setOpenBreakpoint((v) => !v);
	}, [open]);

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

	const isResizeable = useMemo(
		() => resizeable && !toggle && !belowBreakpoint, 
		[resizeable, toggle, belowBreakpoint]
	);

	const header =
		($layout && $layout.rows[0][type === 'left' ? 0 : 2] === type[0]) || false;
	const footer =
		($layout && $layout.rows[2][type === 'left' ? 0 : 2] === type[0]) || false;

	const onMouseEnter = () => {
		!toggle && onMini(false);
	};
	const onMouseLeave = () => {
		!toggle && onMini(true);
	};

	

	const start = {};
	const onStartResize = (e) => {
		start.x = e.pageX;
		start.w = width;
		window.addEventListener("mousemove", onDragResize);
		window.addEventListener("mouseup", onStopResize);
	};
	const onDragResize = (e) => {
		const d = e.pageX - start.x;
		setWidth(start.w+start.x);
		console.log(d);
	};
	const onStopResize = (e) => {
		window.removeEventListener("mousemove", onDragResize);
		window.removeEventListener("mouseup", onStopResize);
	};


	const containerStyle = useMemo(
		() => ({
			top: header ? '' : $layout.header.size,
			bottom: footer ? '' : $layout.footer.size,
			minWidth: isOpen ? '' : 0,
			width: isOpen && isResizeable? width: '',
		}),
		[$layout, header, footer, width, isOpen, isResizeable]
	);
	const style = useMemo(
		() => ({ width: isOpen && isResizeable? width: '' }), 
		[width, isOpen, isResizeable]
	);

	return (
		<XSidebarContext.Provider value={{ width, isMini, isOpen }}>
			<div
				ref={containerRef}
				className={classNames('xSidebar-container', {
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
						'xLayout-sidebar': !!$layout,
						'xSidebar--toggle': toggle,
						[`xSidebar--${type}`]: !!type,
					})}
					style={style}
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
					{toggle && (
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
						<div className="xSidebar-res" 
							onMouseDown={onStartResize}></div>
					)}
				</div>
			</div>
		</XSidebarContext.Provider>
	);
}


/*
// obj for inline CSS
  const [width, setWidth] = useState({ "--width": "200px" });

  const handleWindowMouseMove = useCallback((event) => {
    // console.log(event.clientX)
    setWidth({ "--width": `${event.clientX}px` });
  }, []);

  function hadnleMouseDown() {
    window.addEventListener("mousemove", handleWindowMouseMove);
  }

  function hadnleMouseUp() {
    window.removeEventListener("mousemove", handleWindowMouseMove);
  }
		*/