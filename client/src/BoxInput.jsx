/* eslint-disable react/prop-types */
import './Board.css';

function BoxInput({ refs, goToNextBox }) {
  // Ensure only English letters are inputted
  function validateInput(e) {
    if (!/[a-zA-Z]/.test(e.target.value)) {
      e.target.value = '';
    } else {
      // Valid input!
      e.target.value = e.target.value.toUpperCase();
      goToNextBox();
    }
  }

  return (
    <input
      ref={(element) => refs.current.push(element)}
      type="text" 
      maxLength="1" 
      className="box-input"
      onChange={validateInput}
    />
  );
}

export default BoxInput;