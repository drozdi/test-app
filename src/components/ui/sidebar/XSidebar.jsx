import classNames from 'classnames';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useResizeObserver } from "../../../hooks/useResizeObserver";
import { XLayoutContext } from '../layout/XLayoutContext';

import './XSidebar.scss';

import { XSidebarContext } from './XSidebarContext';

export function XSidebar({
    children, 
    className,
    type = 'left',
    mini = false, 
    miniToOverlay = false,
    open = false,
    overlay = false,
    breakpoint = null,

    width = 300,
    minWidth = 56,
    maxWidth = 400,

    onMouseEnter = () => {},
    onMouseLeave = () => {},
    onResize = () => {},
    ...props
}) {
    const { $layout, $update } = useContext(XLayoutContext) || {}

    const state = useMemo(() => {
        return {
            open: $layout? $layout[type].open: false,
            mini: $layout? $layout[type].mini: false,
        }
    }, [$layout[type].open, $layout[type].mini, open, mini])

    const containerRef = useResizeObserver((target, entry) => {
        onResize({
            width: target.offsetWidth,
            isMini, isOpen
        })
        $layout && $update(type, 'size', target.offsetWidth);
    })

    const belowBreakpoint = useMemo(() => 
        (breakpoint && $layout.width < breakpoint) || false, [$layout, breakpoint]);

    const [isOpenBreakpoint, setOpenBreakpoint] = useState(false)
  
    useEffect(() => {
        setOpenBreakpoint(false)
    }, [belowBreakpoint])
    
    useEffect(() => {
        setOpenBreakpoint(v => !v)
    }, [open])

    //???????????
    const isOpen = useMemo(() => 
        belowBreakpoint? isOpenBreakpoint : open, [open, belowBreakpoint, isOpenBreakpoint])

    const isMini = useMemo(() => 
        mini && !belowBreakpoint, [mini, belowBreakpoint])
    
    const isOverlay = useMemo(() => 
        !belowBreakpoint && open && (mini && overlay || miniToOverlay)? false: (overlay || miniToOverlay), 
        [overlay, mini, open, miniToOverlay, belowBreakpoint])
    
    const isMiniToOverlay = useMemo(() => 
        (miniToOverlay || overlay) && !belowBreakpoint, [miniToOverlay, overlay, belowBreakpoint])

    const header = $layout && $layout.rows[0][type === 'left' ? 0 : 2] === type[0] || false;
    const footer = $layout && $layout.rows[2][type === 'left' ? 0 : 2] === type[0] || false;

    const containerStyle = useMemo(() => ({
        top: header ? '' : $layout.header.size,
        bottom: footer ? '' : $layout.footer.size
    }), [$layout, isOpen])


    return (<XSidebarContext.Provider value={{ isMini, isOpen }}>
        <div ref={containerRef} className={classNames('xSidebar-container', {
            [`xSidebar--${type}`]: !!type,
            [`xSidebar--overlay`]: isOverlay,
            ['xSidebar--mini']: isMini,
            ['xSidebar--mini-overlay']: isMiniToOverlay,
            ['xSidebar--close']: !isOpen,
        })} style={containerStyle}>
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={classNames('xSidebar', {
                'xLayout-sidebar': !!$layout,
                [`xSidebar--${type}`]: !!type,
            })}>
                <div {...props} className={classNames('xSidebar-content', className)}>
                    {children}
                    isOverlay: {isOverlay? 'true':'false'}<br />
                    belowBreakpoint: {belowBreakpoint? 'true':'false'}<br />
                    isOpenBreakpoint: {isOpenBreakpoint? 'true':'false'}<br />
                </div>
            </div>
        </div>
    </XSidebarContext.Provider>);
}