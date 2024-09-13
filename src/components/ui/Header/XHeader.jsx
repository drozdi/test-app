import classNames from "classnames";
import React, { useContext, useMemo, useState } from "react";
import { useResizeObserver } from "../../../hooks/useResizeObserver";
import "./XHeader.scss";
import { XLayoutContext } from "../layout/XLayoutContext";

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