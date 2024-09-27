export function setField(field) {
	return {
		type: 'SET_FIELD',
		payload: field,
	};
}
export function setCurrentPlayer(player) {
	return {
		type: 'SET_CURRENT_PLAYER',
		payload: player,
	};
}
export function setIsDraw(isDraw) {
	return {
		type: 'SET_IS_DRAW',
		payload: isDraw,
	};
}

export function setIsGameEnded(endGame) {
	return {
		type: 'SET_IS_GAME_ENDED',
		payload: endGame,
	};
}

export function restartGame() {
	return {
		type: 'RESTART_GAME',
	};
}
