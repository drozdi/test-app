import classNames from 'classnames';
import { createElement as h, useMemo } from 'react';
import './style.scss';

const roleAttrExceptions = ['ul', 'ol'];
export function XList({
	tag = 'ul',
	children,
	role = null,
	dense = false,
	separator = false,
}) {
	const aRole = useMemo(
		() => (roleAttrExceptions.includes(tag) ? null : (role ?? 'listbox')),
		[tag],
	);
	return h(
		tag,
		{
			className: classNames('x-list', {
				'x-list--dense': dense,
				'x-list--separator': separator,
			}),
			role: aRole,
		},
		children,
	);
}
