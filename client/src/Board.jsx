import { useRef } from 'react';
import axios from 'axios';
import './Board.css';
import BoxInput from './BoxInput';
import SolveButton from './SolveButton';

function Board({ sendResults }) {
  const inputsRef = useRef([]);
  const oldLettersRef = useRef(""); // Prevent HTTP request for same consecutive boards

  function goToNextBox(index) {
    if (index < inputsRef.current.length - 1 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  }

  function goToPreviousBox(index) {
    if (index > 0 && inputsRef.current[index - 1]) {
      inputsRef.current[index - 1].focus();
    }
  }

  function sendBoard() {
    const invalidBoard = inputsRef.current.some((input) => input && input.value === ''); // Check if input is not null first
    if (invalidBoard) {
      return;
    }

    let letters = "";

    inputsRef.current.forEach((input) => {
      if (input) { // Check if input is not null first
        letters += input.value;
      }
    });

    if (oldLettersRef.current === letters) {
      return;
    }
    oldLettersRef.current = letters

    // Send the board to the backend to get the answers
    axios.post('/word-hunt-solver/board', {
      board: letters
    })
    .then(response => sendResults(response.data))
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
          goToPreviousBox={() => goToPreviousBox(index)}
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