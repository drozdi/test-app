import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import { useSlots } from '../../../hooks/useSlots';
import { XLayoutContext } from '../layout/XLayoutContext';
import './XHeader.scss';

export function XHeader({ children, className }) {
	const { $layout } = useContext(XLayoutContext);
	const isLayout = useMemo(() => !!$layout, [$layout]);
	const [slot, hasSlot, wrapSlot] = useSlots(children);
	return (
		<header
			className={classNames(className, 'xHeader', {
				'xLayout-header': isLayout,
			})}
		>
			<div className="xHeader-prepend">{slot('prepend')}</div>
			<div className="xHeader-content">{slot('', null)}</div>
			<div className="xHeader-append">{slot('append')}</div>
		</header>
	);
}
