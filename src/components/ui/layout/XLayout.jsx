import classNames from "classnames";
import React, { useContext, useMemo, useState } from "react";
import { useResizeObserver } from "../../../hooks/useResizeObserver";
import "./XLayout.scss";

import { XBtn } from '../btn/XBtn';

import { XLayoutContext } from "./XLayoutContext";

export function XLayout({ children, container = false, view = 'hhh lpr fff' }) {
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


    let layout = (<div className="xLayout" ref={ref} style={{
        paddingTop: $layout.header.size || '',
        paddingBottom: $layout.footer.size || '',
        paddingLeft: $layout.left.size || '',
        paddingRight: $layout.right.size || '',
    }}>
            {children}
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
    const onClick = (e) => {
        $update('left', 'open', !$layout.left.open);
    }
    
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
    return (<header ref={ref} className={classNames(className, {
        ['xLayout-header']: $layout
    })} style={style}>
        <XBtn color="primary" onClick={onClick}>primary</XBtn>
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
    return (<footer ref={ref} className={classNames(className, {
        ['xLayout-footer']: $layout
    })} style={style}>
        {children}
    </footer>)
}

export function XMain({ children }) {
    const { $layout } = useContext(XLayoutContext)
    return (<main className="x-layout__main">
        {children}
    </main>)
}
