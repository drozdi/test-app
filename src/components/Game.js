import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { restartGame, setCurrentPlayer, setIsDraw, setIsGameEnded } from '../actions';
import Field from './Field';
import style from './Game.module.css';
import Information from './Information';
import { XBtn } from './ui';

const WIN_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2],
];

export class Game extends React.Component {
	static propTypes = {
		field: PropTypes.arrayOf(PropTypes.string),
		isGameEnded: PropTypes.bool,
	};
	static defaultProps = {
		field: Array(9).fill(''),
		isGameEnded: false,
	};
	render() {
		const { isGameEnded, field, setWin, setDraw, restartGame } = this.props;
		const checkWinner = () => {
			if (isGameEnded) {
				return;
			}
			let win = false;
			for (let combination of WIN_COMBINATIONS) {
				let [a, b, c] = combination;
				if (field[a] && field[a] === field[b] && field[b] === field[c]) {
					win = true;
					setWin(field[a]);
				}
			}
			if (!win && field.every((cell) => cell !== '')) {
				setDraw();
			}
		};

		checkWinner();
		return (
			<div className={style.game}>
				<Information />
				<Field />
				<XBtn disabled={!isGameEnded} onClick={() => restartGame()}>
					Начать заново
				</XBtn>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isGameEnded: state.isGameEnded,
	field: state.field,
});
const mapDispatchToProps = (dispatch) => ({
	setWin: (player) => {
		dispatch(setIsGameEnded(true));
		dispatch(setCurrentPlayer(player));
	},
	setDraw: () => {
		dispatch(setIsDraw(true));
		dispatch(setIsGameEnded(true));
	},
	restartGame: () => {
		dispatch(restartGame());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
