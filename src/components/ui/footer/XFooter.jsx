import classNames from 'classnames';
import React, { useContext } from 'react';
import { XLayoutContext } from '../layout/XLayoutContext';
import './XFooter.scss';

export function XFooter({ children, className }) {
	const { $layout, $update } = useContext(XLayoutContext);
	return (
		<footer
			className={classNames(className, 'xFooter', {
				['xLayout-footer']: $layout,
			})}
		>
			{children}
		</footer>
	);
}
