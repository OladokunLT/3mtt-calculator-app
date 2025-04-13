let currentInput = "0";
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

const display = document.getElementById("display");

function updateDisplay() {
  display.value = currentInput;
}

function appendNumber(number) {
  if (waitingForSecondOperand) {
    currentInput = number;
    waitingForSecondOperand = false;
  } else {
    currentInput = currentInput === "0" ? number : currentInput + number;
  }
  updateDisplay();
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(currentInput);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    currentInput = String(result);
    firstOperand = result;
    updateDisplay();
  }

  waitingForSecondOperand = true;
  operator = nextOperator;
}

function calculate(first, second, operator) {
  switch (operator) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "*":
      return first * second;
    case "/":
      if (second === 0) {
        alert("Cannot divide by zero!");
        clear();
        return 0;
      }
      return first / second;
    default:
      return second;
  }
}

function compute() {
  if (operator === null || waitingForSecondOperand) return;

  const inputValue = parseFloat(currentInput);
  const result = calculate(firstOperand, inputValue, operator);

  currentInput = String(result);
  operator = null;
  firstOperand = null;
  waitingForSecondOperand = true;
  updateDisplay();
}

function clear() {
  currentInput = "0";
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay();
}

function appendDecimal() {
  if (waitingForSecondOperand) {
    currentInput = "0.";
    waitingForSecondOperand = false;
    return;
  }
  if (!currentInput.includes(".")) {
    currentInput += ".";
  }
  updateDisplay();
}

// Event Listeners
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.style.transform = "scale(0.95)";
    btn.style.backgroundColor = "#c2c2c2";
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 100);
    setTimeout(() => {
      btn.style.backgroundColor = "";
    }, 100);
  });
});

document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

document.querySelectorAll(".operator").forEach((button) => {
  button.addEventListener("click", () => handleOperator(button.textContent));
});

document.querySelector(".equals").addEventListener("click", compute);
document.querySelector(".clear").addEventListener("click", clear);
document.querySelector(".decimal").addEventListener("click", appendDecimal);

// Initialize display
updateDisplay();
