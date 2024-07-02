import './Information.css';

function InfoCard({ header, body }) {
  return (
    <div className="info-card">
      <div className="info-header">
        {header}
      </div>
      <div className="info-body">
        <div className="words-container">
          {body}
        </div>
      </div>
    </div>
  );
}

export default InfoCard;