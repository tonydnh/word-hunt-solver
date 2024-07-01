import './Board.css';

function SolveButton({ sendBoard }) {
  return (
    <button 
      className="solve-btn"
      onClick={sendBoard}
    >
      <span className="front">
        SOLVE
      </span>
    </button>
  );
}

export default SolveButton;