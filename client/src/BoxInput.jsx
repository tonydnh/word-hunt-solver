import './Board.css';

function BoxInput({ letter }) {
  // Ensure only English letters are inputted
  function validateInput(e) {
    if (!/[a-zA-Z]/.test(e.target.value)) {
      e.target.value = '';
    } else {
      e.target.value = e.target.value.toUpperCase();
    }
  }

  return (
    <input
      type="text" 
      maxLength="1" 
      className="box-input"
      onChange={validateInput}
    ></input>
  );
}

export default BoxInput;