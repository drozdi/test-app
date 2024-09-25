import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import { XLayoutContext } from '../layout/XLayoutContext';
import './XHeader.scss';

export function XHeader({ children, className }) {
	const { $layout } = useContext(XLayoutContext);
	const isLayout = useMemo(() => !!$layout, [$layout]);
	return (
		<header
			className={classNames(className, 'xHeader', {
				'xLayout-header': isLayout,
			})}
		>
			{children}
		</header>
	);
}
