import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPlayer, setField } from '../actions';
import { selectCurrentPlayer, selectField, selectIsGameEnd } from '../selectors';
import FieldLayout from './FieldLayout';

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
