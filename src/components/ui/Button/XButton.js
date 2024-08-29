import styles from './XButton.module.css';
import classNames from 'classnames';

export function XButton ({children, color, rounded, size, block, ...props}) {
    return (<button type="button" {...props} className={classNames({
        [styles['x-btn']]: true,
        [styles[`x-btn--${color}`]]: !!color,
        [styles[`x-btn--${size}`]]: !!size,
        [styles['x-btn--rounded']]: !!rounded,
        [styles['x-btn--block']]: !!block
    })}>{children}</button>);
}