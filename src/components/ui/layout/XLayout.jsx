import React, { useContext, createContext, useEffect, useMemo, useState } from "react";
import { useProxy } from "../../../hooks/useProxy";
import { useResizeObserver } from "../../../hooks/useResizeObserver";

export const LayoutContext = createContext(null);

export function XLayout({ children, container = false, view = 'hhh lpr fff' }) {
    const [$layout, set$layout] = useState({
        isContainer: container,
        rows: view.split(' ').map(row => {
            return row.split('')
        }),
        header: { size: 0, offset: 0, space: false },
        right: { size: 0, offset: 0, space: false },
        footer: { size: 0, offset: 0, space: false },
        left: { size: 0, offset: 0, space: false },
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

    const {
        XHeader = null,
        XFooter = null,
        XLeft = null,
        xRight = null,
        XMain = null
    } = (function (children) {
        if (children.$$typeof) {
            return {
                XMain: children
            };
        }
        const res = {};
        if (Array.isArray(children)) {
            children.forEach((e) => {
                if (e.type.name === 'XSideBar') {
                    if (e.props.type === 'left') {
                        res.XLeft = e;
                    } else if (e.props.type === 'right') {
                        res.xRight = e;
                    }
                } else {
                    res[e.type.name] = e;
                }
            })
        }
        return res;
    })(children)

    let layout = (<div className="x-layout">
        {XHeader}
        {XFooter}
        {XLeft}
        {xRight}
        <div className="x-layout__body" style={{
            paddingTop: $layout.header.size,
            paddingBottom: $layout.footer.size,
            paddingLeft: $layout.left.size,
            paddingRight: $layout.right.size
        }}>
            {XMain}
        </div>
    </div>)
    if (container) {
        layout = (<div className="x-layout__container">
            {layout}
        </div>)
    }

    return (<LayoutContext.Provider value={{ $layout, $update }}>
        {layout}
    </LayoutContext.Provider>)
}

export function XHeader({ children, className = '' }) {
    const { $layout, $update } = useContext(LayoutContext)
    console.log($layout)
    let cn = ['x-header', $layout ? ' x-layout__header' : '', className].join(' ')
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
    return (<header ref={ref} className={cn} style={style}>
        {children}
    </header>)
}

export function XFooter({ children, className = '' }) {
    const { $layout, $update } = useContext(LayoutContext)
    let cn = ['x-footer', $layout ? ' x-layout__footer' : '', className].join(' ')
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
    return (<footer ref={ref} className={cn} style={style}>
        {children}
    </footer>)
}

export function XSideBar({ children, className, type = 'left', width = 200 }) {
    const { $layout, $update } = useContext(LayoutContext)
    let cn = ['x-sidebar', $layout ? ' x-layout__sidebar x-layout__sidebar--' + type : '', className].join(' ')

    const ref = useResizeObserver((target, entry) => {
        $update(type, 'size', target.offsetWidth);
    });

    const header = $layout.rows[0][type === 'left' ? 0 : 2] === type[0]
    const footer = $layout.rows[2][type === 'left' ? 0 : 2] === type[0]

    const style = useMemo(() => ({
        top: header ? 0 : $layout.header.size,
        bottom: footer ? 0 : $layout.footer.size,
        [type]: 0,
        width: width,
    }), [$layout, width])

    return (<aside ref={ref} className={cn} style={style}>
        {children}
    </aside>)
}

export function XMain({ children }) {
    return (<main className="x-layout__main">
        {children}
    </main>)
}
