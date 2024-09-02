'use strict';

// GRAB DOM ELEMENTS
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

// Event Listeners
numPad.addEventListener('click', numPadFunction);
result.addEventListener('click', calculateResult);
percentage.addEventListener('click', calculatePercentage);

// What to do when click on numbers, operations and sign toggle
function numPadFunction(e) {
  // We are looking for classList content so we simplify the expression
  const classList = e.target.classList;

  // What to do if the button pressed is a number
  if (classList.contains('number')) {
    // We use the content of the dataset which is the number value
    const num = e.target.dataset.number;
    displayContent.textContent === '0'
      ? (displayContent.textContent = `${num}`)
      : (displayContent.textContent += `${num}`);
  }

  // What to do if the button pressed is an operation
  if (classList.contains('operation')) {
    // Create an array of all the possible operations
    const operationSymbols = ['+', '-', 'x', '÷'];
    // Access the dataset which contains the operation symbol
    const operation = e.target.dataset.operation;
    // Get the last character of the content of the display to check it is not another operation symbol
    const lastChar = displayContent.textContent.slice(-1);
    operationSymbols.includes(lastChar)
      ? (displayContent.textContent = displayContent.textContent)
      : (displayContent.textContent += `${operation}`);
  }

  // What to do if the button pressed is the toggle sign button
  if (classList.contains('toggle-sign')) {
    // Check if the first character in the display conent is a '-' sign, if it is, remove it, if it isn't, add it
    displayContent.textContent.charAt(0) === '-'
      ? (displayContent.textContent = displayContent.textContent.slice(1))
      : (displayContent.textContent = `-${displayContent.textContent}`);
  }

  // What to do if the button presse is the 'reset' button
  if (classList.contains('reset')) {
    displayContent.textContent = '0';
  }
}

// What to do when click on 'percentage' button
function calculatePercentage() {
  let expression = displayContent.textContent;
  let result = applyPercentageToLastNumber(expression);
  displayContent.textContent = result;
}

function applyPercentageToLastNumber(expression) {
  // Regular expression to match the last character in the expression (I had to look this one up: should be the last string of numbers, including possible float numbers and only if there is no operation sign at the end)
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

  // If the last character is not a number, return the original expression
  return expression;
}

// What to do when click on 'equal' button
function calculateResult(e) {
  // Prevent event from bubbling up to numPad. This creates an unexpected result when resolving the eval() function
  e.stopPropagation();
  try {
    // Evaluate the expression in the display content
    const result = eval(
      // Before evaluating replace symbols with real Math symbols
      displayContent.textContent.replace('÷', '/').replace('x', '*')
    );
    // Show the final result in the display conent
    displayContent.textContent = result;
  } catch (err) {
    console.error('Error evaluating expression:', err);
    displayContent.textContent = 'Error';
  }
}
