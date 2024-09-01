import { useEffect, useMemo, useState } from 'react';
import styles from './XSidebar.module.scss'
import classNames from 'classnames';
import {XSidebarContext} from './XSidebarContext'
import { useResizeObserver } from "../../../hooks/useResizeObserver"

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
        })} style={style}>
            <div className={styles.xSidebar}>
                {children}
            </div>
        </div>
    </XSidebarContext.Provider>);
}