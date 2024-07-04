import { useEffect, useState } from 'react';
import './Information.css';
import InfoCard from './InfoCard';

function Information({ results }) {
  const [cards, setCards] = useState([]);

  // Initial card
  useEffect(() => {
    const newCards = cards.slice();
    newCards.push(
      <InfoCard
        key={0}
        header="How to Use" 
        body="Input the board from your game or enter any random letters then press the solve button for the answers!"
      />
    );
    setCards(newCards);
  }, []);

  useEffect(() => {
    // Only run when results are received from back end
    if (results !== null) {
      const newCards = [];
      // Keys are sent in ascending order, want to display in descending order
      const keys = Object.keys(results).reverse();
      keys.forEach(key => {
        if (results[key].length !== 0) {
          const words = [];
          results[key].forEach((word, index) => {
            words.push(
              <div key={index} className="word">{word}</div>
            );
          });

          newCards.push(
            <InfoCard 
              key={key}
              header={`${key} Letters`}
              body={words}
            />
          );
        }
      });
      setCards(newCards)
    }
  }, [results]);

  return (
    <div className="info">
      {cards}
    </div>
  );
}

export default Information;