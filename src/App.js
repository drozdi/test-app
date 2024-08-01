import React, { useState, useEffect } from 'react';
import './App.css';
import { Board } from './models/Board';
import BoardComponent from './components/BoardComponent';

function App() {
  const [board, setBoard] = useState(new Board());

  useEffect(() => {
    const newBoard = new Board();
    newBoard.init();
    setBoard(newBoard);
  }, [])



  return (<BoardComponent board={board} setBoard={setBoard} />);
}

export default App;
