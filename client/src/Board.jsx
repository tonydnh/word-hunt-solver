import './Board.css';
import BoxInput from './BoxInput';
import SolveButton from './SolveButton';

function Board() {
  return (
    <>
      <form className="form">
        <div className="board">
          <div className="board-row">
            <BoxInput />
            <BoxInput />
            <BoxInput />
            <BoxInput />
          </div>
          <div className="board-row">
            <BoxInput />
            <BoxInput />
            <BoxInput />
            <BoxInput />
          </div>
          <div className="board-row">
            <BoxInput />
            <BoxInput />
            <BoxInput />
            <BoxInput />
          </div>
          <div className="board-row">
            <BoxInput />
            <BoxInput />
            <BoxInput />
            <BoxInput />
          </div>
        </div>
        
        <SolveButton />
      </form>
    </>
  );
}

export default Board;