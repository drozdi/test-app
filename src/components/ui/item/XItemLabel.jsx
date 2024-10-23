import './style.scss';
export function XItemLabel({
	children,
	overline = false,
	caption = false,
	header = false,
	lines = false,
}) {
	return <div className="x-item__label">{children}</div>;
}
