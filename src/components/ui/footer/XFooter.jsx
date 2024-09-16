import classNames from "classnames";
import React, { useContext, useMemo } from "react";
import { useResizeObserver } from "../../../hooks/useResizeObserver";
import { XLayoutContext } from "../layout/XLayoutContext";
import "./XFooter.scss";

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