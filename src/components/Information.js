import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { InformationLayout } from './InformationLayout';

export class Information extends React.Component {
	static propTypes = {
		isDraw: PropTypes.bool,
		isGameEnded: PropTypes.bool,
		currentPlayer: PropTypes.string,
	};
	static defaultProps = {
		isDraw: false,
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
	isDraw: state.isDraw,
});
export default connect(mapStateToProps)(Information);
