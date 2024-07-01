import { useRef, useEffect } from 'react';
import axios from 'axios';
import './Board.css';
import BoxInput from './BoxInput';
import SolveButton from './SolveButton';

function Board() {
  const inputsRef = useRef([]);

  function goToNextBox(index) {
    if (index < inputsRef.current.length - 1 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  }

  function sendBoard() {
    const invalidBoard = inputsRef.current.some((input) => input.value === '');
    if (invalidBoard) {
      return;
    }

    let letters = "";
    inputsRef.current.forEach((input) => letters += input.value);
    
    axios.post('http://localhost:8080/board', {
      board: letters
    })
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
  }

  // Create the board
  const rows = [];
  const boardSize = 4;
  for (let row = 0; row < boardSize; row++) {
    const boxesInRow = [];
    for (let box = 0; box < boardSize; box++) {
      const index = row * boardSize + box;
      boxesInRow.push(
        <BoxInput 
          key={index} 
          refs={inputsRef} 
          goToNextBox={() => goToNextBox(index)} 
        />
      );
    }
    rows.push(
      <div key={row} className="board-row">
        {boxesInRow}
      </div>
    );
  }

  return (
    <>
      <div className="form">
        <div className="board">
          {rows}
        </div>
        <SolveButton sendBoard={sendBoard} />
      </div>
    </>
  );
}

export default Board;