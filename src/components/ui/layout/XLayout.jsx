import React, { useContext, createContext, useEffect, useMemo, useState } from "react";
import { useProxy } from "../../../hooks/useProxy";
import { useResizeObserver } from "../../../hooks/useResizeObserver";

import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

export const LayoutContext = createContext(null);

export function XLayout({ children, container = false, view = 'hhh lpr fff' }) {
    const [$layout, set$layout] = useState({
        isContainer: container,
        rows: view.split(' ').map(row => {
            return row.split('')
        }),
        header: { size: 0, offset: 0, space: false },
        right: { size: 0, offset: 0, space: false, open: true },
        footer: { size: 0, offset: 0, space: false },
        left: { size: 0, offset: 0, space: false, open: true },
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

    let layout = (<div className="x-layout" ref={ref}>
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
    return (<header ref={ref} className={cn} style={style}>
        <Button variant="contained" color="primary" onClick={onClick}>primary</Button>
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

const openedMixin = (theme, width) => ({
    width: width,
});
const colapsedMixin = (theme, width) => ({
    width: `calc(${theme.spacing(7)} + 1px)`,
});
const closedMixin = (theme) => ({
    width: 0
});
const foldedMixin = (theme) => ({
    width: `calc(${theme.spacing(7)} + 1px)`,
})



export function XSideBar({ children, className = '',
    folding = true, foldingBreakpoint = 1024, folded = false,
    open = false, breakpoint = 768,


    miniBreakpoint = 1023, mini = false,
    type = 'left', width = 200, resize = true }) {
    const theme = useTheme();
    const { $layout, $update } = useContext(LayoutContext)

    const header = $layout.rows[0][type === 'left' ? 0 : 2] === type[0]
    const footer = $layout.rows[2][type === 'left' ? 0 : 2] === type[0]

    const [state, setState] = useState({
        open: $layout ? $layout[type].open : open,
        mini: $layout.width < miniBreakpoint,
        hide: $layout.width < breakpoint,
        show: $layout.width >= breakpoint,
        width: width
    })

    const isFolding = useMemo(() => {
        return folding;
    }, [folding, $layout]);

    const isFolded = useMemo(() => {
        return folding && (folded || $layout.width < foldingBreakpoint);
    }, [folding, $layout]);



    const isOpen = useMemo(() => {
        return open || $layout.width > breakpoint;
    }, [open, $layout])


    let cl = className + ['x-sidebar x-sidebar--' + type, $layout ? ' x-layout__sidebar x-layout__sidebar--' + type : ''].join(' ')




    const ref = useResizeObserver((target, entry) => {
        $update(type, 'size', target.offsetWidth);
    });



    const [isHover, setIsHover] = useState(false)

    const onMouseEnter = (e) => {
        setIsHover(true)
    }
    const onMouseLeave = (e) => {
        setIsHover(false)
    }

    const style = useMemo(() => ({
        ...(
            isFolded ? foldedMixin : isOpen ? openedMixin : closedMixin

        )(theme, width),

        top: header ? 0 : $layout.header.size,
        bottom: footer ? 0 : $layout.footer.size
    }), [$layout, state, isFolded])

    return (<aside onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={ref} className={cl} style={style}>
        <div className="x-sidebar__content">
            {children}
        </div>
        {resize && <div className="x-sidebar__res"></div>}
    </aside>)
}

export function XMain({ children }) {
    const { $layout } = useContext(LayoutContext)
    return (<main className="x-layout__main">
        {children}
    </main>)
}
