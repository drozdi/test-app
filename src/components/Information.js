import { useSelector } from 'react-redux';
import { selectCurrentPlayer, selectIsDraw, selectIsGameEnd } from '../selectors';
import InformationLayout from './InformationLayout';
function Information() {
	const isGameEnded = useSelector(selectIsGameEnd);
	const currentPlayer = useSelector(selectCurrentPlayer);
	const isDraw = useSelector(selectIsDraw);

	let message = `Ходит: ${currentPlayer}`;
	if (isDraw) {
		message = 'Ничья';
	} else if (isGameEnded) {
		message = `Выиграл: ${currentPlayer}`;
	}
	return <InformationLayout message={message} />;
}

export default Information;
