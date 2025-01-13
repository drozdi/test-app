import classNames from 'classnames/bind';
import { forwardRefWithAs } from '../../internal/render';
import { XIcon } from '../icon';
import './style.css';
export const XLink = forwardRefWithAs(function XLinkFn(
	{ className, children, noWrap, active, label, description, ...props },
	ref,
) {
	return (
		<a
			className={classNames(
				'x-link',
				{
					'x-link--nowrap': noWrap,
					'x-link--active': active,
				},
				className,
			)}
			{...props}
		>
			<span className="x-link-section">
				<XIcon>mdi-close</XIcon>
			</span>
			<div className="x-link-body">
				<span className="x-link-label">{label}</span>
				<span className="x-link-description">{description}</span>
			</div>
			<div className="x-link-underlay"></div>
			<span className="x-link-section">
				<XIcon>mdi-close</XIcon>
			</span>
		</a>
	);
});
