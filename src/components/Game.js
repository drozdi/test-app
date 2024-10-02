import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restartGame, setCurrentPlayer, setIsDraw, setIsGameEnded } from '../actions';
import { selectField, selectIsGameEnd } from '../selectors';
import Field from './Field';
import style from './Game.module.css';
import Information from './Information';
import { XBtn } from './ui/btn/XBtn';

function Game() {
	const field = useSelector(selectField);
	const isGameEnded = useSelector(selectIsGameEnd);

	const dispatch = useDispatch();

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
	const checkWinner = () => {
		if (isGameEnded) {
			return;
		}
		let win = false;
		for (let combination of WIN_COMBINATIONS) {
			let [a, b, c] = combination;
			if (field[a] && field[a] === field[b] && field[b] === field[c]) {
				win = true;
				dispatch(setIsGameEnded(true));
				dispatch(setCurrentPlayer(field[a]));
			}
		}
		if (!win && field.every((cell) => cell !== '')) {
			dispatch(setIsDraw(true));
			dispatch(setIsGameEnded(true));
		}
	};

	checkWinner();

	return (
		<div className={style.game}>
			<Information />
			<Field />
			<XBtn disabled={!isGameEnded} onClick={() => dispatch(restartGame())}>
				Начать заново
			</XBtn>
		</div>
	);
}

export default Game;
