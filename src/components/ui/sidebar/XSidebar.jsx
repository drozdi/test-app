import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useResizeObserver } from "../../../hooks/useResizeObserver";
import styles from './XSidebar.module.scss';
import { XSidebarContext } from './XSidebarContext';

export function XSidebar({
    children, 

    type = null,
    
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
    ...props
}) {
    const [$layout, $update] = useState({
        totalWidth: 1000,
    })
    const containerRef = useResizeObserver((target, entry) => {
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
    



    const isMini = useMemo(() => mini && !belowBreakpoint, [mini, belowBreakpoint])
    const isOpen = useMemo(() => 
        belowBreakpoint? false :open, [open, belowBreakpoint])
    console.log(isOpen)
    const isOverlay = useMemo(() => overlay, [overlay])
    const isMiniToOverlay = useMemo(() => miniToOverlay, [miniToOverlay])


    const containerStyle = useMemo(() => {
        return {
            display: isOpen? 'flex' : 'none',
            /*width: collapsing? null: isCollapsed ? minWidth : width,
            maxWidth: maxWidth*/
        }
    }, [isOpen])

    return (<XSidebarContext.Provider value={{ isMini }}>
        <div ref={containerRef} className={classNames(styles.xSidebar__container, {
            [styles[`xSidebar--${type}`]]: !!type,
            [styles['xSidebar__container--mini']]: isMini,
            [styles['xSidebar__container--overlay']]: isMiniToOverlay,
        })} style={containerStyle}>
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={classNames(styles.xSidebar, {
                [styles[`xSidebar--${type}`]]: !!type,
                [styles[`xSidebar--overlay`]]: isOverlay,
            })}>
                <div className={styles.xSidebar__content}>
                    {children}
                </div>
            </div>
        </div>
    </XSidebarContext.Provider>);
}