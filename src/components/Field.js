import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPlayer, setField } from '../actions';
import { selectCurrentPlayer, selectField, selectIsGameEnd } from '../selectors';
import { FieldLayout } from './FieldLayout';

function Field() {
	const field = useSelector(selectField);
	const isGameEnded = useSelector(selectIsGameEnd);
	const currentPlayer = useSelector(selectCurrentPlayer);

	const dispatch = useDispatch();

	const setFieldValue = (i) => {
		if (isGameEnded || field[i]) {
			return;
		}
		let newField = field.slice();
		newField[i] = currentPlayer;
		dispatch(setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X'));
		dispatch(setField(newField));
	};

	return <FieldLayout field={field} setFieldValue={setFieldValue} />;
}
FieldLayout.propTypes = {
	field: PropTypes.arrayOf(PropTypes.string),
	setFieldValue: PropTypes.func,
};

export default Field;



export class Field extends React.Component {
	static propTypes = {
		field: PropTypes.arrayOf(PropTypes.string),
		isGameEnded: PropTypes.bool,
		currentPlayer: PropTypes.string,
	};
	static defaultProps = {
		field: Array(9).fill(''),
		isGameEnded: false,
		currentPlayer: 'X',
	};
	render() {
		const { currentPlayer, isGameEnded, isDraw } = this.props;
		let message = `Ходит: ${currentPlayer}`;
		if (isDraw) {
			message = 'Ничья';
		} else if (isGameEnded) {
			message = `Выиграл: ${currentPlayer}`;
		}
		return <InformationLayout message={message} />;
	}
}
const mapStateToProps = (state) => ({
	currentPlayer: state.currentPlayer,
	isGameEnded: state.isGameEnded,
	field: state.field,
});
export default connect(mapStateToProps)(Field);