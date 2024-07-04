import './Board.css';

function ResetButton({ resetBoard }) {

  return (
    <button
      className="reset-btn btn"
      onClick={resetBoard}
    >
      RESET
    </button>
  );
}

export default ResetButton;