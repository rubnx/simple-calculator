'use strict';

// Display
const displayContent = document.querySelector('.display-content');

// Number Pad
const numPad = document.querySelector('.number-pad');

// Functions
const reset = document.querySelector('.reset');
const toggleSign = document.querySelector('.toggle-sign');
const percentage = document.querySelector('.percentage');
const result = document.querySelector('.equal');
const decimal = document.querySelector('.decimal');

numPad.addEventListener('click', numPadFunction);
result.addEventListener('click', calculateResult);
percentage.addEventListener('click', calculatePercentage);

function numPadFunction(e) {
  const classList = e.target.classList;

  if (classList.contains('number')) {
    const num = e.target.dataset.number;
    displayContent.textContent === '0'
      ? (displayContent.textContent = `${num}`)
      : (displayContent.textContent += `${num}`);
  }

  if (classList.contains('operation')) {
    const operationSymbols = ['+', '-', 'x', '÷'];
    const operation = e.target.dataset.operation;
    const lastChar = displayContent.textContent.slice(-1);
    operationSymbols.includes(lastChar)
      ? (displayContent.textContent = displayContent.textContent)
      : (displayContent.textContent += `${operation}`);
  }

  if (classList.contains('toggle-sign')) {
    console.log(displayContent.textContent.slice(1));
    displayContent.textContent.charAt(0) === '-'
      ? (displayContent.textContent = displayContent.textContent.slice(1))
      : (displayContent.textContent = `-${displayContent.textContent}`);
  }

  if (classList.contains('reset')) {
    displayContent.textContent = '0';
  }
}

function calculatePercentage(e) {
  e.stopPropagation();
  const operationSymbols = ['+', '-', 'x', '÷'];
  try {
    //
    function containsSymbol(str) {
      operationSymbols.some((symbol) => str.includes(symbol));
    }
    if (containsSymbol(displayContent.textContent.slice)(1)) {
      displayContent.textContent.split();
    }
    num = num / 100;
  } catch (err) {
    console.error('Error evaluating expression:', err);
    displayContent.textContent = 'Error';
  }
}

function calculatePercentage() {
  let expression = displayContent.textContent;
  let result = applyPercentageToLastNumber(expression);
  displayContent.textContent = result;
}

function applyPercentageToLastNumber(expression) {
  // Regular expression to match the last number in the expression
  // const lastNumberRegex = /(-?\d*\.?\d+)(?!.*\d)/;
  const lastNumberRegex = /(-?\d*\.?\d+)(?!.*[\d])(?=[^\d\w]*$)/;

  // Find the last number
  const match = expression.match(lastNumberRegex);

  if (match) {
    const lastNumber = parseFloat(match[0]);
    const percentValue = lastNumber / 100;

    // Replace the last number with its percentage value
    const result = expression.replace(lastNumberRegex, percentValue.toString());

    return result;
  }

  // If no number found, return the original expression
  return expression;
}

function calculateResult(e) {
  e.stopPropagation(); // Prevent event from bubbling up to numPad
  try {
    console.log('Expression to evaluate:', displayContent.textContent);
    const result = eval(
      displayContent.textContent.replace('÷', '/').replace('x', '*')
    ); // Before evaluating replace symbols with real Math symbols
    console.log('Result:', result);
    displayContent.textContent = result;
  } catch (err) {
    console.error('Error evaluating expression:', err);
    displayContent.textContent = 'Error';
  }
}
