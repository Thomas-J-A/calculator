let screen = document.getElementById('screen');
let displayValue = '';
let operator, operand1;

// handlers for all number buttons
const numbers = Array.from(document.getElementsByClassName('number'));
numbers.forEach(number => {
    number.addEventListener('click', e => {
        displayValue += e.target.textContent;
        updateDisplay();
    });
});

// handlers for all operator buttons
const operators = Array.from(document.getElementsByClassName('operator'));
operators.forEach(op => {
    op.addEventListener('click', e => {
        if (operator) {
            displayValue = operate(operator, operand1, displayValue);
            updateDisplay();
        }
        operator = e.target.textContent;
        operand1 = displayValue;
        displayValue = '';
    });
});

// handler for equals button
const equalsBtn = document.getElementById('equals');
equalsBtn.addEventListener('click', () => {
    if (displayValue === '0' && operator === '/') {
        displayValue = 'Divison by zero...';
        updateDisplay();
    } else {
        displayValue = operate(operator, operand1, displayValue);
        operator = '';
        updateDisplay();
    }
});

// handler for all clear button (AC) 
const acBtn = document.getElementById('ac');
acBtn.addEventListener('click', () => {
    displayValue = '';
    operator = '';
    operand1 = '';
    updateDisplay();
});

// handler for clear button (C)
const cBtn = document.getElementById('c');
cBtn.addEventListener('click', () => {
    displayValue = '';
    updateDisplay();
});


// function to update display
function updateDisplay() {
    screen.textContent = displayValue;
}
















function add(x, y) {
    return Number(x) + Number(y);
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operator, x, y) {
    switch (operator) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case '*':
            return multiply(x, y);
        case '/':
            return divide(x,y);
    }
}

