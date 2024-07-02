import { useState } from 'react';
import './App.css'
import Board from './Board';
import Information from './Information';

function App() {
  const [results, setResults] = useState(null);

  return (
    <div className="container">
      <Board sendResults={(data) => setResults(data)} />
      <Information results={results} />
    </div>
  )
}

export default App;
