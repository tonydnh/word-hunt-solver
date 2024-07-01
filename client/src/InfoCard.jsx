import './Information.css';

function InfoCard() {
  return (
    <div className="info-card">
      <div className="info-header">
        How to Use
      </div>
      <div className="info-body">
        <div className="words-container">
          Input the board from your game and press the solve button for the answers!
        </div>
      </div>
    </div>
  );
}

export default InfoCard;