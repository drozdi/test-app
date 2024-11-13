export * from './btn';
export * from './btnGroup';
export * from './input';
export * from './list';
export * from './message';
export * from './spin';

import { BtnExample } from './btn';
import { BtnGroupExample } from './btnGroup';
import { InputExample } from './input';
import { ListExample } from './list';
import { MessageExample } from './message';
import { SpinExample } from './spin';

export default function ({
	btn = false,
	input = false,
	btnGroup = false,
	list = false,
	message = false,
	spin = false,
}) {
	return (
		<div className="py-8">
			{btnGroup && <BtnGroupExample />}
			{btn && <BtnExample />}
			{input && <InputExample />}
			{list && <ListExample />}
			{message && <MessageExample />}
			{spin && <SpinExample />}
		</div>
	);
}
