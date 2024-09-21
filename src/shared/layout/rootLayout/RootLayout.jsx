export function RootLayout({ content, header, footer }) {
	return (
		<>
			<header>{header}</header>
			<main>
				<div>left</div>
				{content}
				<div>rigtht</div>
			</main>
			<footer>{footer}</footer>
		</>
	);
}
