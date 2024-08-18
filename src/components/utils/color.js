export function isCssColor (color) {
    return color && !!color.match(/^(#|var\(--|(rgb|hsl)a?\()/);
}
export function setBg (color, data = {}) {
    if (isCssColor(color)) {
        data.style = {
            ...(data.style || {}),
            background: color
        }
    } else if (color) {
        data.className += ' bg-'+color
    }
    return data;
}

export function setText (color, data = {}) {
    if (isCssColor(color)) {
        data.style = {
            ...(data.style || {}),
            color: color
        }
    } else if (color) {
        data.className += ' text-'+color
    }
    return data;
}