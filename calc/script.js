window.onload = function() {
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetInput = false;
    const display = document.getElementById('display');
    
    
    const updateDisplay = () => display.textContent = currentInput;

    const appendNumber = (number) => {
        if (currentInput === '0' || resetInput) {
            currentInput = number;
            resetInput = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    };

    const appendDecimal = () => {
        if (resetInput) {
            currentInput = '0.';
            resetInput = false;
        }
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
        }
    };


 const handleOperation = (op) => {
    if (op === 'myOp') {
        try {
            const inputDate = new Date(currentInput);
            if (isNaN(inputDate)) {
                currentInput = 'Неверная дата';
                updateDisplay();
                return;
            }

            // Последнее известное новолуние (например, 8 апреля 2024)
            const lastNewMoon = new Date('2024-04-08T18:21:00Z');

            const diffMs = inputDate - lastNewMoon;
            const diffDays = diffMs / (1000 * 60 * 60 * 24);
            const moonDay = (diffDays % 29.53 + 29.53) % 29.53; // цикл от 0 до 29.53

            currentInput = `Лунный день: ${Math.floor(moonDay) + 1}`;
        } catch (e) {
            currentInput = 'Ошибка';
        }
        updateDisplay();
        return;
    }

    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    resetInput = true;
};

    const calculate = () => {
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        if (isNaN(current)) return;
    
        const operations = {
            '+': () => prev + current,
            '-': () => prev - current,
            '*': () => prev * current,
            '/': () => prev / current,
            '%': () => {
                if (operation === null) {
                    return current / 100;
                } else {
                    return prev * (current / 100);
                }
            },
            '√': () => Math.sqrt(current),
            'x²': () => current * current,
            'x!': () => factorial(Math.floor(current)),
            '±': () => -current,
            '000': () => currentInput + '000'
        };
    
        currentInput = (operation ? operations[operation]() : current).toString();
        operation = null;
        updateDisplay();
    };

    const factorial = (n) => n < 0 ? NaN : n <= 1 ? 1 : n * factorial(n - 1);

    const clearDisplay = () => {
        currentInput = '0';
        previousInput = '';
        operation = null;
        updateDisplay();
    };

    const backspace = () => {
        currentInput = currentInput.length === 1 ? '0' : currentInput.slice(0, -1);
        updateDisplay();
    };

    const toggleTheme = () => {
        document.body.classList.toggle('dark-theme');
        display.classList.toggle('dark-display');
    };

    const changeDisplayColor = () => {
        const colors = ['#ff7675', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe'];
        display.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    };

    window.appendToDisplay = (value) => 
        value === '.' ? appendDecimal() : 
        ['+', '-', '*', '/', '%', '√', 'x²', 'x!', '±', '000', 'myOp'].includes(value) ? 
            handleOperation(value) : appendNumber(value);

    window.clearDisplay = clearDisplay;
    window.calculate = calculate;
    window.backspace = backspace;
    window.toggleTheme = toggleTheme;
    window.changeDisplayColor = changeDisplayColor;

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
};
