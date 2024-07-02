import { useState } from 'react';
import './Board.css';

function BoxInput({ refs, goToNextBox, goToPreviousBox }) {
  const [hasInput, setHasInput] = useState(false);

  // Ensure only English letters are inputted
  function validateInput(e) {
    if (!/[a-zA-Z]/.test(e.target.value)) {
      e.target.value = '';
    } else {
      // Valid input!
      e.target.value = e.target.value.toUpperCase();
      setHasInput(!hasInput);
      goToNextBox();
    }
  }

  function checkForBackspace(e) {
    if (e.key === "Backspace" && !hasInput) {
      if (e.target.value !== '') { // Check to not enable hasInput when backspacing empty box
        setHasInput(!hasInput);
      }
      goToPreviousBox();
    } else if (hasInput && e.target.value === '') { // Second check to ensure not disabling hasInput on full box
      setHasInput(!hasInput);
    }
  }

  return (
    <input
      ref={(element) => refs.current.push(element)}
      type="text" 
      maxLength="1" 
      className="box-input"
      onChange={validateInput}
      onKeyUp={checkForBackspace}
    />
  );
}

export default BoxInput;