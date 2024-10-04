import { useContext } from 'react';

import { XBtn, XIcon } from '../ui';

import { OrderContext } from './OrderContext';

export function OrderBtn() {
	const [sort, setSort] = useContext(OrderContext);

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
		<XBtn icon={true} onClick={onClickSort}>
			<XIcon>
				{sort === 'asc'
					? 'mdi-sort-ascending'
					: sort === 'desc'
						? 'mdi-sort-descending'
						: 'mdi-sort'}
			</XIcon>
		</XBtn>
	);
}
