import './Board.css';

function SolveButton({ sendBoard }) {
  return (
    <button 
      className="solve-btn btn"
      onClick={sendBoard}
    >
      SOLVE
    </button>
  );
}

export default SolveButton;