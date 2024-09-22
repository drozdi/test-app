import style from './RootLayout.module.css';

export function RootLayout({ content, header, footer }) {
	return (
		<div className={style.root}>
			<header className={style.header}>{header}</header>
			<aside className={style.left}>left</aside>
			<main className={style.main}>
				<div className={style.content}>{content}</div>
			</main>
			<aside className={style.right}>rigtht</aside>
			<footer className={style.footer}>{footer}</footer>
		</div>
	);
}
