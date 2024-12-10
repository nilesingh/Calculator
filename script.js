const result = document.getElementById('result');
const buttons = document.querySelectorAll('.buttons button');
let currentInput = '';

// Button click handler
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    if (action === 'clear') {
      clearResult();
    } else if (action === 'delete') {
      deleteLast();
    } else if (action === 'calculate') {
      calculate();
    } else {
      appendToResult(value);
    }
  });
});

// Append a value to the result field
function appendToResult(value) {
  if (currentInput === '0' && value !== '.') currentInput = ''; // Prevent leading zero
  currentInput += value;
  updateResultField();
}

// Clear the result
function clearResult() {
  currentInput = '';
  updateResultField();
}

// Delete the last character
function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateResultField();
}

// Calculate the result
function calculate() {
  try {
    const sanitizedInput = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
    const resultValue = Function(`return ${sanitizedInput}`)(); // Safe evaluation
    currentInput = resultValue.toString();
    updateResultField();
  } catch {
    result.value = 'Error';
    currentInput = '';
  }
}

// Update the result field
function updateResultField() {
  result.value = currentInput || '0';
}

// Keyboard support
document.addEventListener('keydown', event => {
  const key = event.key;
  if ('0123456789+-*/.%'.includes(key)) {
    appendToResult(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape') {
    clearResult();
  }
});
