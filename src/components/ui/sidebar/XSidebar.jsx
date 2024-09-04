import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useResizeObserver } from "../../../hooks/useResizeObserver";
import styles from './XSidebar.module.scss';
import { XSidebarContext } from './XSidebarContext';

export function XSidebar({
    children, 
    className,

    type = 'left',
    
    mini = false, 
    miniToOverlay = false,

    open = false,
    overlay = false,
    breakpoint = 600,

    width = 300,
    minWidth = 56,
    maxWidth = 400,

    onMouseEnter = () => {},
    onMouseLeave = () => {},
    onUpM = (v) => {},
    ...props
}) {
    const [$layout, $update] = useState({
        totalWidth: 1000,
    })
    const containerRef = useResizeObserver((target, entry) => {
        onUpM(target.offsetWidth);
        //$update(old => ({...old, totalWidth: target.offsetWidth}));
        //$update('footer', 'size', target.offsetHeight)
    })

    function resss () {
        $update(old => ({...old, totalWidth: window.innerWidth}));
    }
    useEffect(() => {
        window.addEventListener('resize', resss);
        resss();
        return () => {
            window.removeEventListener('resize', resss);
        }
    }, []);
    

    const belowBreakpoint = useMemo(() => 
        (breakpoint && $layout.totalWidth < breakpoint) || false, [$layout, breakpoint]);
    



    const isMini = useMemo(() => 
        mini && !belowBreakpoint, [mini, belowBreakpoint])

    //???????????
    const isOpen = useMemo(() => 
        belowBreakpoint? belowBreakpoint && open :open, [open, belowBreakpoint])

    const isOverlay = useMemo(() => 
        !belowBreakpoint && open && (mini && overlay || miniToOverlay)? false: overlay, 
        [overlay, mini, open, miniToOverlay, belowBreakpoint])
    
    const isMiniToOverlay = useMemo(() => 
        (miniToOverlay || overlay) && !belowBreakpoint, [miniToOverlay, overlay, belowBreakpoint])


    const containerStyle = useMemo(() => {
        return {
            //display: isOpen? '' : 'none',
            /*width: collapsing? null: isCollapsed ? minWidth : width,
            maxWidth: maxWidth*/
        }
    }, [isOpen])

    return (<XSidebarContext.Provider value={{ isMini, isOpen }}>
        <div ref={containerRef} className={classNames(styles['xSidebar-container'], {
            [styles[`xSidebar--${type}`]]: !!type,
            [styles[`xSidebar--overlay`]]: isOverlay,
            [styles['xSidebar--mini']]: isMini,
            [styles['xSidebar--mini-overlay']]: isMiniToOverlay,
            [styles['xSidebar--close']]: !isOpen,
        })} style={containerStyle}>
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={classNames(styles.xSidebar, {
                [styles[`xSidebar--${type}`]]: !!type,
            })}>
                <div className={classNames(styles['xSidebar-content'], className)}>
                    {children}
                </div>
            </div>
        </div>
    </XSidebarContext.Provider>);
}