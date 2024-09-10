import classNames from "classnames";
import React, { useContext, useMemo, useState } from "react";
import { useResizeObserver } from "../../../hooks/useResizeObserver";
import { useSlots } from "../../../hooks/useSlots";
import "./XLayout.scss";

import { XBtn } from '../btn/XBtn';

import { XSidebar } from "../sidebar/XSidebar";
import { XLayoutContext } from "./XLayoutContext";


/*const useSlots = createSlots({
    header: () => null,
    footer: () => null,
    left: () => null,
    right: () => null
});*/

export function XLayout({ children, container = false, view = 'hhh lpr fff', breakpoint = 600 }) {
    const [$layout, set$layout] = useState({
        isContainer: container,
        rows: view.split(' ').map(row => {
            return row.split('')
        }),
        header: { size: 0, offset: 0, space: false },
        right: { size: 0, offset: 0, space: false, open: true, mini: true },
        footer: { size: 0, offset: 0, space: false },
        left: { size: 0, offset: 0, space: false, open: true, mini: true },
        width: 0
    });
    const $update = (part, prop, val) => {
        if ($layout[part][prop] !== val) {
            set$layout(v => ({
                ...v, [part]: {
                    ...v[part],
                    [prop]: val
                }
            }))
        }
    }
    const ref = useResizeObserver((target, entry) => {
        if ($layout.width !== target.offsetWidth) {
            set$layout(v => ({ ...v, width: target.offsetWidth }))
        }
    });
    const belowBreakpoint = useMemo(() => 
        (breakpoint && $layout.width < breakpoint) || false, [$layout, breakpoint]);

    const [slot, hasSlot] = useSlots(children);

    const left = () => {
        return (<XSidebar 
            type="left" 
            open={!belowBreakpoint || $layout.left.open} 
            mini={!belowBreakpoint && $layout.left.mini} 
            toggle={!belowBreakpoint}
            breakpoint={breakpoint}
            overlay={belowBreakpoint}
            miniToOverlay={true}
            onResize={({width}) => {$update('left', 'size', width)}}
            onMini={(mini) => $update('left', 'mini', mini)}
            onToggle={(open) => $update('left', 'open', open)}>
            {slot('left', null)}
        </XSidebar>)
    }
    const right = () => {
        return (<XSidebar 
            type="right" 
            open={!belowBreakpoint || $layout.right.open} 
            mini={!belowBreakpoint && $layout.right.mini}
            toggle={!belowBreakpoint}
            breakpoint={breakpoint}
            overlay={belowBreakpoint}
            miniToOverlay={true}
            onResize={({width}) => {$update('right', 'size', width)}}
            onMini={(mini) => $update('right', 'mini', mini)} 
            onToggle={(open) => $update('right', 'open', open)}>
            {slot('right', null)}
        </XSidebar>)
    }
    const footer = () => {
        return (<XFooter>{slot('footer', null)}</XFooter>);
    }
    const header = () => {
        return (<XHeader>
            {hasSlot('left') && belowBreakpoint && <XBtn color="primary" onClick={() => $update('left', 'open', !$layout.left.open)}>left</XBtn>}
            {hasSlot('right') && belowBreakpoint && <XBtn color="primary" onClick={() => $update('right', 'open', !$layout.right.open)}>right</XBtn>}
            {slot('header', null)}
        </XHeader>);
    }
    const def = () => {
        return (<XMain>{slot('', null)}</XMain>);
    }

    let layout = (<div className="xLayout" ref={ref} style={{
        paddingTop: $layout.header.size, 
        paddingLeft: $layout.left.size, 
        paddingRight: $layout.right.size,
        paddingBottom: $layout.footer.size,
    }}>
        {hasSlot('left') && left()}
        {hasSlot('right') && right()}
        {hasSlot('header') && header()}
        {hasSlot('footer') && footer()}
        {def()}
    </div>)
    if (container) {
        layout = (<div className="xLayout-container">
            {layout}
        </div>)
    }

    return (<XLayoutContext.Provider value={{ $layout, $update }}>
        {layout}
    </XLayoutContext.Provider>)
}

export function XHeader({ children, className }) {
    const { $layout, $update } = useContext(XLayoutContext)
    const ref = useResizeObserver((target, entry) => {
        $update('header', 'size', target.offsetHeight);
    });
    
    const style = useMemo(() => {
        const css = {};
        if ($layout.rows[0][0] === "l") {
            css.left = $layout.left.size;
        }
        if ($layout.rows[0][2] === "r") {
            css.right = $layout.right.size;
        }
        return css;
    }, [$layout])
    return (<header ref={ref} className={classNames(className, 'xHeader', {
        ['xLayout-header']: $layout
    })} style={style}>
        {children}
    </header>)
}

export function XFooter({ children, className }) {
    const { $layout, $update } = useContext(XLayoutContext)
    const ref = useResizeObserver((target, entry) => {
        $update('footer', 'size', target.offsetHeight)
    })
    const style = useMemo(() => {
        const css = {};
        if ($layout.rows[2][0] === "l") {
            css.left = $layout.left.size;
        }
        if ($layout.rows[2][2] === "r") {
            css.right = $layout.right.size;
        }
        return css;
    }, [$layout])
    return (<footer ref={ref} className={classNames(className, 'xFooter', {
        ['xLayout-footer']: $layout
    })} style={style}>
        {children}
    </footer>)
}

export function XMain({ children }) {
    const { $layout, $update } = useContext(XLayoutContext)
    return (<main className="x-layout__main">
        {children}
    </main>)
}
