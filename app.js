let inputBox = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = '';

buttons.forEach(element => {
    element.addEventListener('click', (b) => {
        let buttonText = b.target.innerText;

        if (buttonText == '=') {
            try {
                string = handlePercentage(string);
                string = String(eval(string));  // Caution: eval can be dangerous
                inputBox.value = string;
            } catch (e) {
                inputBox.value = 'Error';
                string = '';
            }
        } else if (buttonText == 'AC') {
            string = '';
            inputBox.value = string;
        } else if (buttonText == 'DEL') {
            string = string.substring(0, string.length - 1);
            inputBox.value = string;
        } else if (b.target.id == 'plusMinus') {
            try {
                string = String(-eval(string));
                inputBox.value = string;
            } catch (e) {
                inputBox.value = 'Error';
                string = '';
            }
        } else {
            string += buttonText;
            inputBox.value = string;
        }
    });
});

function handlePercentage(input) {
    const regex = /(\d+)([\+\-\*\/])(\d+)%/;
    while (regex.test(input)) {
        input = input.replace(regex, (match, p1, operator, p2) => {
            const base = parseFloat(p1);
            const percentValue = base * (parseFloat(p2) / 100);
            return base + operator + percentValue;
        });
    }
    return input;
}
