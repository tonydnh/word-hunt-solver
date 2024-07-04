import { useState } from 'react';
import './App.css'
import Board from './Board';
import Information from './Information';

function App() {
  const [results, setResults] = useState(null);

  return (
    <div className="all">
      <div className="container">
        <Board sendResults={(data) => setResults(data)} />
        <Information results={results} />
      </div>
      <div className="footer">
        made by <a className="credits" href="https://github.com/tonydnh" target="_blank" rel="noopener noreferrer">
          tony
        </a>
      </div>
    </div>
  )
}

export default App;
