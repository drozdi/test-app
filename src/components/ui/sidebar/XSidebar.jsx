import classNames from 'classnames';
import { useMemo } from 'react';
import { useResizeObserver } from "../../../hooks/useResizeObserver";
import styles from './XSidebar.module.scss';
import { XSidebarContext } from './XSidebarContext';

export function XSidebar({
    children, 

    type = null,
    
    collapsed = false, 
    collapsedBreakpoint = null,
    collapsedForOverlay = false,

    open = false,
    breakpoint = null,

    width = 300,
    minWidth = 56,
    maxWidth = 400,
    ...props
}) {

    const containerRef = useResizeObserver((target, entry) => {
        //$update('footer', 'size', target.offsetHeight)
    })
    
    const isCollapsed = useMemo(() => collapsed || (collapsedBreakpoint && (window.innerWidth < collapsedBreakpoint)), [collapsed, collapsedBreakpoint])

    const isOpen = useMemo(() => open || (breakpoint && (window.innerWidth < breakpoint)), [breakpoint, open])


    const style = useMemo(() => {
        return {
            /*width: collapsing? null: isCollapsed ? minWidth : width,
            maxWidth: maxWidth*/
        }
    }, [width, maxWidth, minWidth, isCollapsed])

    return (<XSidebarContext.Provider value={{ isCollapsed }}>
        <div ref={containerRef} className={classNames(styles.xSidebar__container, {
            [styles[`xSidebar--${type}`]]: !!type,
            [styles['xSidebar__container--collapsed']]: isCollapsed,
            [styles['xSidebar__container--overlay']]: collapsedForOverlay,
        })} style={style}>
            <div className={classNames(styles.xSidebar, {
                [styles[`xSidebar--${type}`]]: !!type,
            })}>
                <div className={styles.xSidebar__content}>
                    {children}
                </div>
            </div>
        </div>
    </XSidebarContext.Provider>);
}