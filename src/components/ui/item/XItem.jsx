import './style.scss';

export function XItem({ tag = 'li', children }) {
	return (
		<li className="x-item">
			<div className="x-item__backdor"></div>
			{children}
		</li>
	);
}
