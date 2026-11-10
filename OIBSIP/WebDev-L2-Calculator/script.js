let currentInput = '';
let currentOperation = '';
let previousInput = '';

const display = document.getElementById('display');

function updateDisplay() {
  if (previousInput && currentOperation) {
    display.value = previousInput + ' ' + currentOperation + ' ' + currentInput;
  } else {
    display.value = currentInput || '0';
  }
}

function appendNumber(number) {
  if (number === '.' && currentInput.includes('.')) return;
  currentInput += number;
  updateDisplay();
}

function appendOperation(operation) {
  if (currentInput === '' && previousInput === '') return;

  if (currentInput === '' && previousInput !== '') {
    currentOperation = operation;
    updateDisplay();
    return;
  }

  if (previousInput !== '') {
    calculate();
  }

  currentOperation = operation;
  previousInput = currentInput;
  currentInput = '';
  updateDisplay();
}

function calculate() {
  if (previousInput === '' || currentInput === '') return;

  let result;
  let prev = parseFloat(previousInput);
  let current = parseFloat(currentInput);

  switch (currentOperation) {
    case '+':
      result = prev + current;
      break;
    case '-':
    case '−':
      result = prev - current;
      break;
    case '*':
    case '×':
      result = prev * current;
      break;
    case '/':
    case '÷':
      if (current === 0) {
        alert("Cannot divide by zero");
        clearDisplay();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  currentOperation = '';
  previousInput = '';
  display.value = currentInput;
}

function deleteLastDigit() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function clearDisplay() {
  currentInput = '';
  previousInput = '';
  currentOperation = '';
  display.value = '0';
}

document.getElementById('button-container').addEventListener('click', (e) => {
  const btn = e.target;
  if (btn.tagName !== 'BUTTON') return;

  if (btn.dataset.num !== undefined) {
    appendNumber(btn.dataset.num);
  } else if (btn.dataset.operator !== undefined) {
    appendOperation(btn.dataset.operator);
  } else if (btn.dataset.action === 'clear') {
    clearDisplay();
  } else if (btn.dataset.action === 'backspace') {
    deleteLastDigit();
  } else if (btn.dataset.action === 'decimal') {
    appendNumber('.');
  } else if (btn.dataset.action === 'equals') {
    calculate();
  }
});