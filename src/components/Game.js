
import React, { useState } from 'react';
import style from './Game.module.css';
import Information from './Information';
import Field from './Field';


function Game() {
    const WIN_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ];
    const [field, setField] = useState(Array(9).fill(''));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [isGameEnded, setIsGameEnded] = useState(false);
    const [isDraw, setIsDraw] = useState(false);
    const checkWinner = () => {
        if (isGameEnded) {
            return;
        }
        for (let combination of WIN_COMBINATIONS) {
            let [a, b, c] = combination;
            if (field[a] && field[a] === field[b] && field[b] === field[c]) {
                setIsGameEnded(true);
                setCurrentPlayer(field[a])
            }
        }
        if (field.every(cell => cell !== '')) {
            setIsDraw(true);
            setIsGameEnded(true);
        }
    }
    const setFieldValue = (i) => {
        if (isGameEnded || field[i]) {
            return;
        }
        let newField = field.slice();
        newField[i] = currentPlayer;
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        setField(newField);
    }
    const reloadClick = () => {
        setField(Array(9).fill(''));
        setIsGameEnded(false);
        setIsDraw(false);
        setCurrentPlayer('X');
    }
    checkWinner();

    return (<div className={style.game}>
        <Information isDraw={isDraw} isGameEnded={isGameEnded} currentPlayer={currentPlayer} />
        <Field field={field} setFieldValue={setFieldValue} />
        <button disabled={!isGameEnded} onClick={reloadClick}>Начать заново</button>
    </div>);
}

export default Game;