import classNames from 'classnames';
import { useMemo } from 'react';
import { useResizeObserver } from "../../../hooks/useResizeObserver";
import styles from './XSidebar.module.scss';
import { XSidebarContext } from './XSidebarContext';

export function XSidebar({
    children, 
    
    collapsing = false, 
    collapsed = false, 
    collapsedBreakpoint = null,
    collapsedForOverlay = false,


    breakpoint = null,
    width = 300,
    minWidth = 56,
    maxWidth = 400,
    ...props
}) {

    const containerRef = useResizeObserver((target, entry) => {
        //$update('footer', 'size', target.offsetHeight)
    })
    
    const isCollapsed = useMemo(() => {
        return collapsed || (collapsedBreakpoint && (window.innerWidth < collapsedBreakpoint))
    }, [collapsed, collapsedBreakpoint, window.innerWidth])


    const style = useMemo(() => {
        return {
            /*width: collapsing? null: isCollapsed ? minWidth : width,
            maxWidth: maxWidth*/
        }
    }, [width, maxWidth, minWidth, isCollapsed])

    return (<XSidebarContext.Provider value={{ isCollapsed }}>
        <div ref={containerRef} className={classNames(styles.xSidebar__container, {
            [styles['xSidebar__container--collapsing']]: collapsing,
            [styles['xSidebar__container--collapsed']]: isCollapsed,
            [styles['xSidebar__container--overlay']]: collapsedForOverlay,
        })} style={style}>
            <div className={styles.xSidebar}>
                <div className={styles.xSidebar__content}>
                    {children}
                </div>
            </div>
        </div>
    </XSidebarContext.Provider>);
}