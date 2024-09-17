import classNames from 'classnames';
import React, { useContext } from 'react';
import { XLayoutContext } from '../layout/XLayoutContext';
import './XHeader.scss';

export function XHeader({ children, className }) {
	const { $layout, $update } = useContext(XLayoutContext);
	return (
		<header
			className={classNames(className, 'xHeader', {
				['xLayout-header']: $layout,
			})}
		>
			{children}
		</header>
	);
}
