export * from './btn';
export * from './btnGroup';
export * from './input';
export * from './list';

import { BtnExample } from './btn';
import { BtnGroupExample } from './btnGroup';
import { InputExample } from './input';
import { ListExample } from './list';
export default function ({ btn = false, input = false, btnGroup = false, list = false }) {
	return (
		<div className="py-8">
			{btnGroup && <BtnGroupExample />}
			{btn && <BtnExample />}
			{input && <InputExample />}
			{list && <ListExample />}
		</div>
	);
}
