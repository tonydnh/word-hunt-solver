import { useState } from 'react';
import './Board.css';
import BoxInput from './BoxInput';
import SolveButton from './SolveButton';

function Board() {
  const [boxes, setBoxes] = useState(Array(16).fill(''));


  // Create the board
  const rows = [];
  const boardSize = 4;
  for (let row = 0; row < boardSize; row++) {
    const boxesInRow = [];
    for (let box = 0; box < boardSize; box++) {
      const index = row * boardSize + box;
      boxesInRow.push(
        <BoxInput key={index} letter={boxes[index]} />
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
      <form className="form">
        <div className="board">
          {rows}
        </div>
        <SolveButton />
      </form>
    </>
  );
}

export default Board;