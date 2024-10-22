import './style.scss';

export function XListItem({ tag = 'li', children }) {
	return (
		<li className="x-list-item">
			<div className="x-list-item__content">{children}</div>
		</li>
	);
}
