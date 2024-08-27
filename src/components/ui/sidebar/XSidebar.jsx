import styles from './XSidebar.module.scss'

export function XSidebar() {
    return (<div className={styles.xSidebar}>
        <ul className={styles.menu}>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
        </ul>
    </div>);
}