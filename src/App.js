import React, { useState, useEffect } from 'react';
import './App.css';
import { ChessGame } from './models/ChessGame';
import { Colors } from './models/Colors';
import { Player } from './models/Player';
import BoardComponent from './components/BoardComponent';

function App() {
  const [board, setBoard] = useState(new ChessGame());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE, 'Белый'));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK, 'Черный'));
  const [currentPlayer, setCurrentPlayer] = useState(null)
  function restart() {
    const newBoard = new ChessGame();
    newBoard.generateCells();
    newBoard.generateFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer)
  }

  useEffect(() => {
    restart()
  }, [])

  function swapPlayer() {
    if (currentPlayer.color === Colors.WHITE) {
      setCurrentPlayer(blackPlayer)
    } else {
      setCurrentPlayer(whitePlayer)
    }
  }

  return (<BoardComponent
    currentPlayer={currentPlayer}
    swapPlayer={swapPlayer}
    board={board}
    setBoard={setBoard} />);
}

export default App;
