import { XMessage } from '../ui/message';
export function MessageExample() {
	return (
		<div className="max-w-4xl m-auto py-4 relative">
			<XMessage type="info" underlined="left" outline={true} icon="mdi-close">
				Test
			</XMessage>
		</div>
	);
}
