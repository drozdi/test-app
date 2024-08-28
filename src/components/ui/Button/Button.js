import styles from './Button.module.css';

export function Button ({children, props}) {
    return (<button type="button" {...props} className={styles['x-btn']}>{children}</button>);
}