import { forwardRefWithAs, render } from '../../utils/render';
import { XBtn } from '../ui';

function BtnFn(props, ref) {
	return render({
		as: 'button',
		...props,
		className: 'p-2 bg-green-600',
		ref,
	});
}

const Btn = forwardRefWithAs(BtnFn);

export function HomeExample() {
	return (
		<div className="p-4">
			<XBtn as="a">Test Test</XBtn>
		</div>
	);
}
