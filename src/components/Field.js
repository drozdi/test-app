import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setCurrentPlayer, setField } from '../actions';
import { FieldLayout } from './FieldLayout';

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
		const { currentPlayer, isGameEnded, field, setState } = this.props;

		const setFieldValue = (i) => {
			if (isGameEnded || field[i]) {
				return;
			}
			let newField = field.slice();
			newField[i] = currentPlayer;
			setState(newField, currentPlayer === 'X' ? 'O' : 'X');
		};

		return <FieldLayout field={field} setFieldValue={setFieldValue} />;
	}
}
const mapStateToProps = (state) => ({
	currentPlayer: state.currentPlayer,
	isGameEnded: state.isGameEnded,
	field: state.field,
});
const mapDispatchToProps = (dispatch) => ({
	setState: (field, nextPlayer) => {
		dispatch(setCurrentPlayer(nextPlayer));
		dispatch(setField(field));
	},
});
export default connect(mapStateToProps, mapDispatchToProps)(Field);
