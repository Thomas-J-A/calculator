let screen = document.getElementById('screen');
let displayValue = '';
let operator, operand1;

// handlers for all number buttons
const numbers = Array.from(document.getElementsByClassName('number'));
numbers.forEach(number => {
    number.onclick = function(e, x) { // x used when no access to event object
        if (x) {  
            if (displayValue.length < 9){
                displayValue += x;
                updateDisplay();
            }
        } else {
            if (displayValue.length < 9){
                displayValue += e.target.textContent;
                updateDisplay();
            }
        }
    };
});

// handlers for all operator buttons
const operators = Array.from(document.getElementsByClassName('operator'));
operators.forEach(op => {
    op.onclick = function(e, x) {  // x used when no access to event object
        if (operator) {
            displayValue = operate(operator, operand1, displayValue);
            updateDisplay();
        }
        if (x) {
            operator = x;
            operand1 = displayValue;
            displayValue = '';
        } else {
            operator = e.target.textContent;
            operand1 = displayValue;
            displayValue = '';
        }
    };
});

// handler for equals button
const equalsBtn = document.getElementById('equals');
equalsBtn.onclick = function() {
    if (displayValue === '0' && operator === '/') {  // division by 0
        displayValue = 'Zero?..';
        updateDisplay();
    } else if (!operator && !operand1) {  // pressed equals before operator
        console.error('pressed equals before operator');
    } else if (!displayValue) {  // pressed operator then equals
        if (operand1 === '0') {
            displayValue = 'Zero?..';
            updateDisplay();
        } else {
            displayValue = operate(operator, operand1, operand1);
            operator = '';
            operand1 = '';
            updateDisplay();
        }
    } else {
        displayValue = operate(operator, operand1, displayValue);
        operator = '';
        operand1 = '';
        updateDisplay();
    }
};

// handler for all clear button (AC) 
const acBtn = document.getElementById('ac');
acBtn.onclick = function() {
    displayValue = '';
    operator = '';
    operand1 = '';
    updateDisplay();
};

// handler for clear button (C)
const cBtn = document.getElementById('c');
cBtn.onclick = function() {
    displayValue = '';
    updateDisplay();
};

// handler for floating point button (.) 
const floatBtn = document.getElementById('decimal');
floatBtn.onclick = function() {
    if (/\./.test(displayValue) == true) {
        console.error('more than one decimal point');
    } else {
        displayValue += '.';
        updateDisplay();
    }
};

// keyboard support
window.addEventListener('keydown', e => {
    e.preventDefault();  // prevent default behaviour of '/' key in browser
    let key = e.key;
    switch (true) {
        case /[0-9]/.test(key):            // numerical key pressed
            let num;
            for (let i = 0; i < numbers.length; i++) {    // get DOM object
                if (numbers[i].textContent === key) {
                    num = numbers[i];
                } 
            }
            num.onclick(e, num.textContent);  // programmatically run handler
            break;                         
        case /[\+\-\*\/]/ .test(key):      // operator key pressed
            let op;
            for (let i = 0; i < operators.length; i++) {
                if (operators[i].textContent === key) {
                    op = operators[i];
                }
            }
            op.onclick(e, op.textContent);
            break;                            
        case /\./.test(key):               // decimal point key pressed
            floatBtn.onclick();
            break;
        case /Delete/.test(key):           // delete key pressed (AC)
            acBtn.onclick();
            break;
        case /Backspace/.test(key):        // backspace key pressed (C)
            cBtn.onclick();
            break;
        case /=/.test(key):                // equals key pressed
            equalsBtn.onclick();
            break;      
    }    
});


// function to update display
function updateDisplay() {
    screen.textContent = displayValue;
}


function add(x, y) {
    return +x + +y;
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
            let sumResult = add(x, y).toString();
            if (sumResult.length > 9) return 'Too many digits!';
            else return sumResult;
        case '-':
            let subResult = subtract(x, y).toString();
            if (subResult.length > 9) return 'Too many digits!';
            else return subResult;
        case '*':
            let multResult = multiply(x, y).toString();
            if (multResult.length > 9) return 'Too many digits!';
            else return multResult; 
        case '/':
            let divResult = divide(x,y).toString();
            if (divResult.length > 9) return 'Too many digits!';
            else return divResult;
    }
}
