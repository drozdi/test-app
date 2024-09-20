import { useContext, useState } from 'react';

import { XButton } from '../ui/Button/XButton';
import { XIcon } from '../ui/Icon/XIcon';

import { OrderContext } from './OrderContext';

export function OrderBtn() {
	const context = useContext(OrderContext);
	console.log(context);
	const [sort, setSort] = useState(false);
	const onClickSort = () => {
		if (sort === 'asc') {
			setSort('desc');
		} else if (sort === 'desc') {
			setSort(false);
		} else {
			setSort('asc');
		}
	};

	return (
		<XButton icon={true} onClick={onClickSort}>
			<XIcon>
				{sort === 'asc'
					? 'mdi-sort-ascending'
					: sort === 'desc'
						? 'mdi-sort-descending'
						: 'mdi-sort'}
			</XIcon>
		</XButton>
	);
}
