
const numButtons = document.querySelectorAll('[number]')
const opButtons = document.querySelectorAll('[operation]')
const equalsButton = document.querySelector('[equals]')
const deleteButton = document.querySelector('[delete]')
const clearButton = document.querySelector('[clear]')
const prevOpTextElement = document.querySelector('[prev-operand]')
const currOpTextElement = document.querySelector('[curr-operand]')

class Calculator {
    constructor(prevOpTextElement, currOpTextElement) {
        this.prevOpTextElement = prevOpTextElement;
        this.currOpTextElement = currOpTextElement;
        this.clear();
    }

    clear() {
        this.currOperand = '0';
        this.prevOperand = '';
        this.operation = undefined;
    }

    delete() {
        if(this.currOperand.length === 1){
            this.currOperand = '0';
        } else {
            this.currOperand = this.currOperand.substring(0,this.currOperand.length - 1)
        }
    }

    appendNumber(number) {
        if (number === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()
    }

    chooseOp(operation){
        if (this.currOperand === '') return
        if (this.prevOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }

    compute(){
        let sum
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currOperand)
        if(isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                sum = prev + curr
                sum = sum.toFixed(2);
                break
            case '−':
                sum = prev - curr
                sum = sum.toFixed(2);
                break
            case '×':
                sum = prev * curr
                sum = sum.toFixed(2);
                break
            case '÷':
                sum = prev / curr
                sum = sum.toFixed(2);
                break
            default: 
                return
        }
        this.currOperand = sum
        this.operation = undefined
        this.prevOperand = ''
    }

    updateDisplay(){
        this.currOpTextElement.innerText = this.getDisplayNumber(this.currOperand)
        if(this.operation != null){
            this.prevOpTextElement.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
        } else {
            this.prevOpTextElement.innerText = ''
        }
    }

    getDisplayNumber(number){
        const stringNum = number.toString()
        const integerNum = parseFloat(stringNum.split('.')[0])
        const decimalNum = stringNum.split('.')[1]
        let integerDisplay
        if(isNaN(integerNum)){
            integerDisplay = ''
        } else {
            integerDisplay = integerNum.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalNum != null){
            return `${integerDisplay}.${decimalNum}`
        } else {
            return integerDisplay
        }
    }
}

const calculator = new Calculator(prevOpTextElement, currOpTextElement)

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOp(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

