const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Calculate first and second values depending on operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,

  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,

  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,

  "=": (firstNumber, secondNumber) => secondNumber,
}

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

const sendNumberValue = (number) => {
  // Replace the current value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // IF the display is empty, then display the number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
  }
}

const addDecimal = () => {
  // If operator pressed don't add decimal
  if (awaitingNextValue) return;
  // If no decimal is present, then add one
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

const useOperator = (operator) => {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operators being pressed
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return
  };
  // Assign the first value if no value is present
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const result = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = result;
    firstValue = result;
  }
  // Ready for the next value
  awaitingNextValue = true;
  operatorValue = operator;
}

// Reset all the Values, display
const resetAll = () => {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
}

// Add Event Listeners for numbers, operators and decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length ===0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
}) 

// Event Listeners
clearBtn.addEventListener("click", resetAll);

