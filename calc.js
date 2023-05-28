class Calculator {
  constructor(prevOperandTextElement, currentOperandTextElement) {
    this.prevOperandTextElement = prevOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.prevOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  compute() {
    const prev = parseFloat(this.prevOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    let result;
    switch (this.operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = result.toFixed(2); // Keep two decimal places
    this.operation = undefined;
    this.prevOperand = '';
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.prevOperandTextElement.innerText = `${this.prevOperand} ${this.operation}`;
    } else {
      this.prevOperandTextElement.innerText = '';
    }
  }
}

const prevOperandTextElement = document.querySelector('.prev-operand');
const currentOperandTextElement = document.querySelector('.current-operand');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('.span-two');

const calculator = new Calculator(prevOperandTextElement, currentOperandTextElement);

function updateDisplay() {
  calculator.updateDisplay();
}

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.operation = button.innerText;
    calculator.prevOperand = calculator.currentOperand;
    calculator.currentOperand = '';
    updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  updateDisplay();
});

clearButton.addEventListener('click', () => {
  calculator.clear();
  updateDisplay();
});
